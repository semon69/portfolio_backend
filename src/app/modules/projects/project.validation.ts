import { z } from 'zod';

export const zodProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.string().min(1, 'image is required'),
  description: z.string().min(1, 'description is required'),
  g_frontend: z.string().min(1, 'G_frontend is required'),
  g_backend: z.string().min(1, 'G_backend is required'),
  live_link: z.string().min(1, 'Live link is required'),
});
