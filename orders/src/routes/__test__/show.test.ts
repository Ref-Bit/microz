import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';

it('Fetches the order', async () => {
  //? Create a ticket
  const ticket = new Ticket({
    title: 'Test-Title',
    price: 20,
  });
  await ticket.save();

  //? Create User
  const user = getAuthCookie();

  //? Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //? Make request to fetch the order
  const { body: foundedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(foundedOrder.id).toEqual(order.id);
});

it('returns an error if one user tries to fetch another users order', async () => {
  // Create a ticket
  const ticket = new Ticket({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = getAuthCookie();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', getAuthCookie())
    .send()
    .expect(401);
});
