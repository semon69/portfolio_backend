import { z } from 'zod';

export const zodProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.string().min(1, 'image is required'),
  description: z.string().min(1, 'description is required'),
  // Optional: closed-source and internal work has no public repo or URL.
  g_frontend: z.string().optional(),
  g_backend: z.string().optional(),
  live_link: z.string().optional(),
});
