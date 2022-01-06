import { Router } from 'express';

const router = Router();

router.get('/signout', (req, res) => {
  res.send('Hi signoutRouter!');
});

export { router as signoutRouter };
