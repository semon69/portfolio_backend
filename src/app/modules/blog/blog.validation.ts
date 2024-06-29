import { z } from 'zod';

export const zodBlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.string().min(1, 'Image is required'),
  description: z.string().min(1, 'description is required'),
});
