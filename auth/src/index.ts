import express from 'express';
import { json } from 'body-parser';
import { AuthRouter } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(AuthRouter);

app.listen(PORT, () =>
  console.log(`Auth service live on port ${PORT}...🚀🚀🚀`)
);
