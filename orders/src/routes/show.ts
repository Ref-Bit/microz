import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@refbit-ticketing/common';
import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import { Order } from '../models/Order';

const router = Router();

router.get(
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

    res.json(order);
  }
);

export { router as showRouter };
