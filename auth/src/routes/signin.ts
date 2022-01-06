import { Router } from 'express';

const router = Router();

router.get('/signin', (req, res) => {
  res.send('Hi signinRouter!');
});

export { router as signinRouter };
