import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { zodProjectSchema } from './project.validation';
import { projectController } from './project.controller';

const router = express.Router();

router.post(
  '/add',
  validateRequest(zodProjectSchema),
  projectController.addProject,
);
router.get('/', projectController.getAll);
router.get('/:id', projectController.getSingleProject);
router.patch('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export const ProjectRoutes = router;
