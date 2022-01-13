import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@refbit-ticketing/common';
import { User } from '../models/User';
import JWT from 'jsonwebtoken';

const router = Router();

router.post(
  '/signup',
  [
    body('email')
      .normalizeEmail() // Sanitizes email
      .isEmail()
      .withMessage('Email must be valid')
      .bail() // halts validation if previous validation fails
      .custom(async value => {
        const existingUser = await User.findOne({ email: value });

        if (existingUser) {
          throw new BadRequestError('Email in use');
        }
        return true;
      }),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();

    const userJWT = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(201).json(user);
  }
);

export { router as signupRouter };
