import request from 'supertest';
import { app } from '../../app';

it('Has a route handler listening to /api/tickets for post request', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('Can only be accessed if user is authenticated', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('Returns a status code other than 401 if the user is authenticated', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('Returns an error if title is invalid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      price: 10,
    })
    .expect(400);
});

it('Returns an error if price is invalid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'Test-Title',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'Test-Title',
    })
    .expect(400);
});

it('Creates a new ticket with valid input', async () => {});
