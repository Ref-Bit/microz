import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { AuthRouter } from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(AuthRouter);
app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
