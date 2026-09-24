import mongoose, { model } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema<TUser, UserModel>({
  name: { type: String, required: true },
  // unique, because login/reset both resolve an account by findOne({ email }):
  // a duplicate would shadow the original and silently make it unreachable
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String },
  password: { type: String, default: "admin" },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // only hash when the password actually changed, otherwise saving any other
  // field would hash the already-hashed value again and lock the user out
  if (!user.isModified('password')) {
    return next();
  }

  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT) || 12,
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
