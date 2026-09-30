import { z } from 'zod';

export const zodSkillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  // Kept as a free string rather than an enum so new groups can be added
  // from the dashboard without needing a backend deploy.
  category: z.string().min(1, 'Category is required'),
  image: z.string().optional(),
});
