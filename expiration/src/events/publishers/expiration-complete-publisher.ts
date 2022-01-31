import { ExpirationCompleteEvent, Publisher, Subjects } from '@refbit-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
