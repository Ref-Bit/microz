import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { AuthRouter } from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(AuthRouter);
app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB...✅');
    app.listen(PORT, () =>
      console.log(`Auth service live on port ${PORT}...🚀`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
