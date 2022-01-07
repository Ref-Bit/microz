import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validator-error';
import { User } from '../models/User';

const router = Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters!'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const foundedUser = await User.findOne({ email });

    if (foundedUser) {
      return res.json({});
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json(user);
  }
);

export { router as signupRouter };
