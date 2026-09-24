import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { role: string; email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

// The reset secret is salted with the user's current password hash, which makes
// every link single-use: once the password changes the hash changes, so any
// link issued before that stops verifying. It is also a different secret from
// JWT_SERCET, so a reset token can never be replayed as a login token.
const resetSecret = (currentPasswordHash: string) =>
  (process.env.JWT_RESET_SECRET || 'reset-secret-fallback') + currentPasswordHash;

export const createResetToken = (
  email: string,
  currentPasswordHash: string,
) => {
  return jwt.sign({ email, purpose: 'reset' }, resetSecret(currentPasswordHash), {
    expiresIn: (process.env.JWT_RESET_EXPIRES_IN ||
      '15m') as SignOptions['expiresIn'],
  });
};

export const verifyResetToken = (
  token: string,
  currentPasswordHash: string,
) => {
  const decoded = jwt.verify(
    token,
    resetSecret(currentPasswordHash),
  ) as JwtPayload;

  if (decoded.purpose !== 'reset') {
    throw new Error('Invalid reset token');
  }

  return decoded;
};
