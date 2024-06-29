import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogController } from './blog.controller';
import { zodBlogSchema } from './blog.validation';

const router = express.Router();

router.post(
  '/add',
  validateRequest(zodBlogSchema),
  blogController.addBlog,
);
router.get('/', blogController.getAll);
router.get('/:id', blogController.getSingleBlog);
router.patch('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export const BlogRoutes = router;
