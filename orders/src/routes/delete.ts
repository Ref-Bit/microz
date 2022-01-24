import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@refbit-ticketing/common';
import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { Order, OrderStatus } from '../models/Order';
import { natsWrapper } from '../nats-wrapper';

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
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //? Publish an event Order Cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).json(order);
  }
);

export { router as deleteRouter };
