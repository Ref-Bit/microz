import { Router } from 'express';
import JWT from 'jsonwebtoken';

const router = Router();

router.get('/current-user', (req, res) => {
  if (!req.session?.jwt) {
    return res.status(404).json({ currentUser: null });
  }

  try {
    const payload = JWT.verify(req.session.jwt, process.env.JWT_KEY!);
    res.status(200).json({ currentUser: payload });
  } catch (error) {
    res.status(404).json({ currentUser: null });
  }
});

export { router as currentUserRouter };
