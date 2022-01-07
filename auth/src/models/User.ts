import { Schema, model } from 'mongoose';
import { Password } from '../utils/password-handler';

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const UserModel = model<IUser>('User', UserSchema);

//! Necessary for Typescript to check passed arguments when creating a new User
class User extends UserModel {
  constructor(attrs: IUser) {
    super(attrs);
  }
}

export { User };
