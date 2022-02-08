import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from '@refbit-ticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
