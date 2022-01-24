import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@refbit-ticketing/common';
import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import { Order, OrderStatus } from '../models/Order';

const router = Router();

router.delete(
  '/:orderId',
  requireAuth,
  [
    param('orderId')
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage('orderId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //TODO: Publish an event Order is Cancelled

    res.status(204).json(order);
  }
);

export { router as deleteRouter };
