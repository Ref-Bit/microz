import { Publisher, OrderCreatedEvent, Subjects } from '@refbit-ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
