import { Router, Request, Response } from 'express';

const router = Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  res.json({});
});

export { router as deleteRouter };
