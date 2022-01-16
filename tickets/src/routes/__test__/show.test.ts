import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('Returns a 404 if the ticket is not found', async () => {
  const id = new Types.ObjectId().toHexString();
  // console.log('MONGO_ID', id);

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('Returns the ticket if found', async () => {
  // Temp ticket to send
  const ticket = {
    title: 'Test-Title',
    price: 99,
  };

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getAuthCookie())
    .send(ticket)
    .expect(201);

  const foundTicket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(foundTicket.body.title).toEqual(ticket.title);
  expect(foundTicket.body.price).toEqual(ticket.price);
});
