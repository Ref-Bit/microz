import { Router } from 'express';
import { currentUserRouter } from './current-user';
import { signinRouter } from './signin';
import { signoutRouter } from './signout';
import { signupRouter } from './signup';

const router = Router();

router.use('/api/auth', [
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
]);

export { router as AuthRouter };
