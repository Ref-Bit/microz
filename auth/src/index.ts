import express from 'express';
import { json } from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

app.listen(PORT, () => console.log(`Live on port ${PORT}...🚀`));
