import { Router } from 'express';

const router = Router();

router.get('/current-user', (req, res) => {
  res.send('Hi currentUserRouter!');
});

export { router as currentUserRouter };
