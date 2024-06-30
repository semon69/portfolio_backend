import mongoose, { model } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema<TUser, UserModel>({
  name: { type: String, required: true },
  email: { type: String },
  role: { type: String },
  password: { type: String, default: "admin" },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT),
  );

  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const User = model<TUser, UserModel>('User', userSchema);

export default User;
