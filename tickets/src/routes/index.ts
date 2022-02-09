import { Router, Request, Response } from 'express';
import { Ticket } from '../models/Ticket';

const router = Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  // Get all unreserved tickets
  const tickets = await Ticket.find({
    orderId: undefined,
  });

  res.json(tickets);
});

export { router as indexTicketRouter };
