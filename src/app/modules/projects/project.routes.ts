import express from 'express';
import { skillController } from './project.controller';
import validateRequest from '../../middlewares/validateRequest';
import { zodProjectSchema } from './project.validation';

const router = express.Router();

router.post(
  '/add',
  validateRequest(zodProjectSchema),
  skillController.addEx,
);
router.get('/', skillController.getAll);
router.get('/:id', skillController.getSingleEx);
router.patch('/:id', skillController.updateEx);
router.delete('/:id', skillController.deleteEx);

export const ExperienceRoutes = router;
