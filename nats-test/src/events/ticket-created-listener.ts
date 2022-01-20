import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { Subjects } from './subject';
import { TicketCreatedEvent } from './ticket-created-event';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  /**
   * readonly is essential for TS to make sure its value will NOT be modified
   * @see https://www.typescriptlang.org/docs/handbook/classes.html#readonly-modifier
   */
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data!', data);

    msg.ack();
  }
}
