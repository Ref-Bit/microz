import { Schema, model } from 'mongoose';

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

const UserModel = model<IUser>('User', UserSchema);

//! Necessary for Typescript to check passed arguments when creating a new User
class User extends UserModel {
  constructor(attrs: IUser) {
    super(attrs);
  }
}

export { User };
