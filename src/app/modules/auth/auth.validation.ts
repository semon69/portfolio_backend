import { z } from 'zod';

export const zodForgotPasswordSchema = z.object({
  email: z.string().email('A valid email is required'),
});

export const zodResetPasswordSchema = z.object({
  email: z.string().email('A valid email is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});
