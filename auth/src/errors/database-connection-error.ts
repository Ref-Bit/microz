import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Data connection failure';

  constructor() {
    super('Data connection failure');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.reason }];
  }
}
