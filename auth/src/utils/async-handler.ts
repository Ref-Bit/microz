/**
 * This is an optional alternative of express-async-errors package
 * @example
    app.all("*", asyncHandler(async () => {
        throw new NotFoundError();
      })
    );  
*/

import { Handler, NextFunction, Response, Request } from 'express';

export const asyncHandler =
  (handler: Handler): Handler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (ex) {
      next(ex);
    }
  };
