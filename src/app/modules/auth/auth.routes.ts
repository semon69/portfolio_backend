import { Router } from 'express'
import {
  forgotPasswordRequest,
  registerUser,
  resetPasswordRequest,
  userLogin,
} from './auth.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  zodForgotPasswordSchema,
  zodResetPasswordSchema,
} from './auth.validation';

const router = Router();


// guarded: this route hands out admin accounts, so only a signed-in admin may
// call it. Use the forgot-password flow below to recover a lost password.
router.post(
  '/register',
  auth('admin'),
  registerUser,
);
router.post(
  '/login',
  userLogin,
);
router.post(
  '/forgot-password',
  validateRequest(zodForgotPasswordSchema),
  forgotPasswordRequest,
);
router.post(
  '/reset-password',
  validateRequest(zodResetPasswordSchema),
  resetPasswordRequest,
);

export const UserRoutes = router;
