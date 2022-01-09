import { Router } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { verifyCurrentUser } from '../middlewares/verify-current-user';

const router = Router();

router.get('/current-user', verifyCurrentUser, requireAuth, (req, res) => {
  res.status(200).json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
