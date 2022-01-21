import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@refbit-ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
