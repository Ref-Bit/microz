import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@refbit-ticketing/common';
import { User } from '../models/User';
import { PasswordHandler } from '../utils/password-handler';
import JWT from 'jsonwebtoken';

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
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const isMatchedPasswords = await PasswordHandler.toCompare(
      existingUser.password,
      password
    );

    if (!isMatchedPasswords) {
      throw new BadRequestError('Invalid Credentials');
    }

    const userJWT = JWT.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(200).json(existingUser);
  }
);

export { router as signinRouter };
