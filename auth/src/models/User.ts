import { Schema, model } from 'mongoose';
import { PasswordHandler } from '../utils/password-handler';

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordHandler.toHash(this.get('password'));
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
