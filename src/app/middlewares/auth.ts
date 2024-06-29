import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/auth/auth.model';


export const USER_ROLE = {
  admin: 'admin'
} as const;

export type TUserRole = keyof typeof USER_ROLE;

const auth = (userRole: string) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    // check, is token sent by user
    if (!token) {
      throw new Error(
        'You are not authorized person',
      );
    }

    // check, is token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SERCET as string,
      ) as JwtPayload;
    } catch (error) {
      throw new Error('Unauthorized Person');
    }
    const { role, email } = decoded;

    // check, is users exists or not
    const user = await User.findOne({email: email});

    if (!user) {
      throw new Error('The user is not found');
    }

    // check, is users deleted or not
    const userEmail = user?.email;
    if (userEmail !== email) {
      throw new Error('Unauthorized Person');
    }

    if (role !== userRole) {
      throw new Error(
        'Unauthorized person',
      );
    }
    // if (requiredRoles && !requiredRoles.includes(role)) {
    //   throw new Error(
    //     'You are not authorized person',
    //   );
    // }

    next();
  });
};
export default auth;