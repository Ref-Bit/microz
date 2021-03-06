import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';
import { Types } from 'mongoose';

const createTicket = async () => {
  const ticket = Ticket.build({
    id: new Types.ObjectId().toHexString(),
    title: 'Test-Title',
    price: 20,
  });
  await ticket.save();

  return ticket;
};

it('Fetches orders for an particular user', async () => {
  //? Create 3 Tickets
  const ticketOne = await createTicket();
  const ticketTwo = await createTicket();
  const ticketThree = await createTicket();

  //? Create 2 Users
  const userOne = getAuthCookie();
  const userTwo = getAuthCookie();

  //? Create 1 order as User #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  //? Create 2 orders as User #2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  //? Make request to get orders for User #2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);

  //? Make sure we only got the orders for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(response.body[1].ticket.id).toEqual(ticketThree.id);
});
