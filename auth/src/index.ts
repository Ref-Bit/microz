import express from 'express';
import { json } from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

app.get('/api/users/current-user', (req, res) => {
  res.send('Hi Refaat, Whats up?');
});

app.listen(PORT, () => console.log(`Live on port ${PORT}...🚀🚀🚀`));
