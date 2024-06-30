import express from 'express';
import { skillController } from './experience.controller';
import validateRequest from '../../middlewares/validateRequest';
import { zodExperienceSchema } from './experience.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/add',
  auth("admin"),
  validateRequest(zodExperienceSchema),
  skillController.addEx,
);
router.get('/', skillController.getAll);
router.get('/:id', skillController.getSingleEx);
router.patch('/:id', skillController.updateEx);
router.delete('/:id', skillController.deleteEx);

export const ExperienceRoutes = router;
