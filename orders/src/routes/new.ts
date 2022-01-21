import { requireAuth, validateRequest } from '@refbit-ticketing/common';
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.json({});
  }
);

export { router as newRouter };
