import { Publisher, OrderCreated, Subjects } from '@refbit-ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreated> {
  readonly subject = Subjects.OrderCreated;
}
