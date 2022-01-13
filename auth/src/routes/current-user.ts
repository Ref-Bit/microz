import { Router } from 'express';
import { verifyCurrentUser } from '@refbit-ticketing/common';

const router = Router();

router.get('/current-user', verifyCurrentUser, (req, res) => {
  res.status(200).json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
