import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('Returns a 404 if the provided id does not exist', async () => {
  const id = new Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', getAuthCookie())
    .send({ title: 'Updated-Ticket-Title', price: 50 })
    .expect(404);
});

it('Returns a 401 if user is not authenticated', async () => {
  const id = new Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: 'Updated-Ticket-Title', price: 50 })
    .expect(401);
});

it('Returns a 401 if user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getAuthCookie())
    .send({ title: 'Ticket-Title', price: 50 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', getAuthCookie())
    .send({ title: 'Updated-Ticket-Title', price: 55 })
    .expect(401);
});

it('Returns a 400 if the user provides invalid inputs', async () => {
  const cookie = getAuthCookie();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'Ticket-Title', price: 50 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'Updated-Ticket-Title', price: -20 })
    .expect(400);
});

it('Update the ticket provided with valid inputs', async () => {
  const cookie = getAuthCookie();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'Ticket-Title', price: 50 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'Updated-Ticket-Title', price: 20 })
    .expect(200);

  const updatedTicket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(updatedTicket.body.title).toEqual('Updated-Ticket-Title');
  expect(updatedTicket.body.price).toEqual(20);
});

it('Publishes an event', async () => {
  // Temp ticket to send
  const cookie = getAuthCookie();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'Ticket-Title', price: 50 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'Updated-Ticket-Title', price: 20 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
