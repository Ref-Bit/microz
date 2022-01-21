import { Router, Request, Response } from 'express';

const router = Router();

router.put('/api/orders/:orderId', async (req: Request, res: Response) => {
  res.json({});
});

export { router as showRouter };
