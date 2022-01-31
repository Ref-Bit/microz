import { OrderCreatedEvent, OrderStatus } from '@refbit-ticketing/common';
import { Types } from 'mongoose';
import { Ticket } from '../../../models/Ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const ticket = new Ticket({
    title: 'Test-Title',
    price: 99,
    userId: new Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const data: OrderCreatedEvent['data'] = {
    id: new Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: new Types.ObjectId().toHexString(),
    expiresAt: 'whatever-date',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    ticket,
    data,
    msg,
  };
};

it('Sets the userId of the ticket', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('Acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
