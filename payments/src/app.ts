import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  errorHandler,
  NotFoundError,
  verifyCurrentUser,
} from '@refbit-ticketing/common';
import cookieSession from 'cookie-session';
import { PaymentsRouter } from './routes';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(verifyCurrentUser);
app.use(PaymentsRouter);
app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
