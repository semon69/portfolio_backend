import { z } from 'zod';

export const zodExperienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  timeSpan: z.string().min(1, 'timeSpan is required'),
  company: z.string().min(1, 'Compnay is required'),
  description: z.string().min(1, 'description is required'),
});
