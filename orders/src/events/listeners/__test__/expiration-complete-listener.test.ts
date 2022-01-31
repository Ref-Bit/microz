import { ExpirationCompleteEvent, OrderStatus } from '@refbit-ticketing/common';
import { Types } from 'mongoose';
import { Order } from '../../../models/Order';
import { Ticket } from '../../../models/Ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { ExpirationCompleteListener } from '../expiration-complete-listener';

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);
  const ticket = Ticket.build({
    id: new Types.ObjectId().toHexString(),
    title: 'Test-Title',
    price: 99,
  });
  await ticket.save();

  const order = new Order({
    status: OrderStatus.Created,
    userId: new Types.ObjectId().toHexString(),
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

it('Updates the order status to cancelled', async () => {
  const { listener, order, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('Emits an OrderCancelled event', async () => {
  const { listener, order, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const orderEventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(orderEventData.id).toEqual(order.id);
});

it('Acks the message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
