import { TUser } from './auth.interface';
import User from './auth.model';
import { createToken } from './auth.utils';

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const user = await User.findOne({ email});

  if (!user) {
    throw new Error('This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new Error('Password do not matched');
  }

  const jwtPayload = {
    role: user?.role,
    email: user?.email,
  };

  const token = createToken(
    jwtPayload,
    process.env.JWT_SERCET as string,
    process.env.JWT_EXPIRES_IN as string,
  );
  return {
    token,
  };
};

export const registerUserIntoDb = async (payload: TUser) => {
  const result = await User.create(payload);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...otherFields } = result.toObject();
  return otherFields;
};
