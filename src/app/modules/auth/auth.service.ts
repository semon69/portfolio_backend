import { TUser } from './auth.interface';
import User from './auth.model';
import { createResetToken, createToken, verifyResetToken } from './auth.utils';
import { sendResetPasswordEmail } from '../../utils/sendEmail';

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
  payload.role = "admin"
  const result = await User.create(payload);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...otherFields } = result.toObject();
  return otherFields;
};

export const forgotPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload.email });

  // Deliberately silent when the email is unknown: telling the caller which
  // addresses exist would turn this route into an account enumeration tool.
  if (user) {
    const token = createResetToken(user.email, user.password);
    const clientUrl =
      process.env.CLIENT_URL || 'https://portfolio-dashboard-seven.vercel.app';
    const resetLink = `${clientUrl}/reset-password?email=${encodeURIComponent(
      user.email,
    )}&token=${token}`;

    await sendResetPasswordEmail(user.email, resetLink);
  }

  return {
    message:
      'If an account exists for that email, a reset link has been sent to it.',
  };
};

export const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('This user is not found !');
  }

  try {
    const decoded = verifyResetToken(token, user.password);

    if (decoded.email !== payload.email) {
      throw new Error('This reset link does not belong to that account');
    }
  } catch (error) {
    throw new Error(
      'This reset link is invalid or has expired. Please request a new one.',
    );
  }

  // assigning the plain password lets the pre-save hook hash it
  user.password = payload.newPassword;
  await user.save();

  return { message: 'Password reset successfully. You can now log in.' };
};
