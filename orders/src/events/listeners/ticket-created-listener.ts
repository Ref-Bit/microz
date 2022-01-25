import {
  Listener,
  Subjects,
  TicketCreatedEvent,
} from '@refbit-ticketing/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/Ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = new Ticket({
      title,
      price,
    });
    //! Setting the auto generated _id by mongo with the id of Ticket created by ticket service to match with order 
    ticket.set({ _id: id });
    await ticket.save();

    msg.ack();
  }
}
