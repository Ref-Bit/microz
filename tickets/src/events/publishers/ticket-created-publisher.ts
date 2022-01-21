import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@refbit-ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
