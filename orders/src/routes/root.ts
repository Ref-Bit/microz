import { requireAuth } from '@refbit-ticketing/common';
import { Router, Request, Response } from 'express';
import { Order } from '../models/Order';

const router = Router();

router.get('/', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.json(orders);
});

export { router as rootRouter };
