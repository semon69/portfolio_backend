import { z } from 'zod';

export const zodSkillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().min(1, 'Name is required'),
});
