import { Router } from 'express'
import { registerUser, userLogin } from './auth.controller';

const router = Router();


router.post(
  '/register',
  registerUser,
);
router.post(
  '/login',
  userLogin,
);

export const UserRoutes = router;