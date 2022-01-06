export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message); // message here is for logging purposes only
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
