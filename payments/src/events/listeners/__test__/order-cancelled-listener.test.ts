import { OrderCancelledEvent, OrderStatus } from '@refbit-ticketing/common';
import { Types } from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Order';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    status: OrderStatus.Cancelled,
    price: 99,
    version: 0,
    userId: new Types.ObjectId().toHexString(),
  });
  await order.save();

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: new Types.ObjectId().toHexString(),
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

it('Updates the status of the order', async () => {
  const { listener, order, data, msg } = await setup();
  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('Acks the message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
