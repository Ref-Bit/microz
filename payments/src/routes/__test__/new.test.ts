import request from 'supertest';
import { app } from '../../app';
import { Types } from 'mongoose';
import { Order } from '../../models/Order';
import { OrderStatus } from '@refbit-ticketing/common';
import { stripe } from '../../stripe';

it('Returns a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', getAuthCookie())
    .send({
      token: 'random-token',
      orderId: new Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('Returns a 401 when purchasing an order that does not belong to the user', async () => {
  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    version: 0,
    userId: new Types.ObjectId().toHexString(),
    price: 99,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', getAuthCookie())
    .send({
      token: 'random-token',
      orderId: order.id,
    })
    .expect(401);
});

it('Returns a 400 when purchasing a cancelled order', async () => {
  const userId = new Types.ObjectId().toHexString();
  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    version: 0,
    userId,
    price: 99,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', getAuthCookie(userId))
    .send({
      token: 'random-token',
      orderId: order.id,
    })
    .expect(400);
});

it('Returns a 204 with valid inputs', async () => {
  const userId = new Types.ObjectId().toHexString();
  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    version: 0,
    userId,
    price: 99,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', getAuthCookie(userId))
    .send({
      token: 'tok_mastercard',
      orderId: order.id,
    })
    .expect(201);

  const chargeOpts = (stripe.charges.create as jest.Mock).mock.calls[0][0];

  expect(chargeOpts.source).toEqual('tok_mastercard');
  expect(chargeOpts.amount).toEqual(99 * 100);
  expect(chargeOpts.currency).toEqual('usd');
});
