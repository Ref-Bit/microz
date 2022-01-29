import { Publisher, OrderCancelledEvent, Subjects } from '@refbit-ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}