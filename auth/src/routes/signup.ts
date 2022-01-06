import { Router } from 'express';

const router = Router();

router.get('/signup', (req, res) => {
  res.send('Hi signupRouter!');
});

export { router as signupRouter };
