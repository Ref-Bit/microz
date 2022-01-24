import { Publisher, OrderCancelled, Subjects } from '@refbit-ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelled> {
  readonly subject = Subjects.OrderCancelled;
}