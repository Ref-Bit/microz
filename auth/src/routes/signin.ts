import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password field is required'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.json({});
  }
);

export { router as signinRouter };
