import { OrderCreatedEvent, OrderStatus } from '@refbit-ticketing/common';
import { Types } from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Order';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: new Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: 'whatever-date',
    userId: new Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    ticket: {
      id: new Types.ObjectId().toHexString(),
      price: 99,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('Replicates the order info', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it('Acks the message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
