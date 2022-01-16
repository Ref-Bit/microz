import { NotFoundError, validateRequest } from '@refbit-ticketing/common';
import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import { Ticket } from '../models/Ticket';
import { Types as MongooseTypes } from 'mongoose';

const router = Router();

router.get(
  '/api/tickets/:id',
  param('id')
    .custom(idValue => MongooseTypes.ObjectId.isValid(idValue))
    .withMessage('id must be a valid MongoDB ObjectId'),
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    res.json(ticket);
  }
);

export { router as showTicketRouter };
