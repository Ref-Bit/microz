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
import { Order } from '../models/Order';
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

    await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });

    res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
