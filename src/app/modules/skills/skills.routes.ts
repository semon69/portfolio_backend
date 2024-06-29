import express from 'express';
import { skillController } from './skils.controller';
import validateRequest from '../../middlewares/validateRequest';
import { zodSkillSchema } from './skills.validation';

const router = express.Router();

router.post(
  '/add',
  validateRequest(zodSkillSchema),
  skillController.addSkill,
);
router.get('/', skillController.getAll);
router.get('/:id', skillController.getSingleSkill);
router.patch('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

export const SkillRoutes = router;
