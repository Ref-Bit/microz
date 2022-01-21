import request from 'supertest';
import { app } from '../../app';
import { Types } from 'mongoose';
import { Ticket } from '../../models/Ticket';
import { Order, OrderStatus } from '../../models/Order';

it('Returns an error if ticket does not exist', async () => {
  const ticketId = new Types.ObjectId();
  await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({ ticketId })
    .expect(404);
});

it('Returns an error if ticket is already reserved', async () => {
  const ticket = new Ticket({
    title: 'Test-Title',
    price: 20,
  });
  await ticket.save();
  console.log('TICKET', ticket);

  const order = new Order({
    userId: 'random-user-id',
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket,
  });

  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('Reserves a ticket', async () => {
  const ticket = new Ticket({
    title: 'Test-Title',
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', getAuthCookie())
    .send({ ticketId: ticket.id })
    .expect(201);
});
