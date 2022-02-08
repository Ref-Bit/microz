import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@refbit-ticketing/common';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { Order } from '../models/Order';
import { Payment } from '../models/Payment';
import { natsWrapper } from '../nats-wrapper';
import { stripe } from '../stripe';

const router = Router();

router.post(
  '/',
  requireAuth,
  [
    body('token').not().isEmpty().withMessage('token must be provided'),
    body('orderId')
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage('orderId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for a cancelled order');
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: charge.id,
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
