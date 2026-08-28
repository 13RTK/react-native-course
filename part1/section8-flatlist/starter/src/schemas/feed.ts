import * as z from 'zod';

export const feedSchema = z.object({
  id: z.int().positive(),
  title: z.string().length(20),
  description: z.string(),
});

export type Feed = { image: string } & z.infer<typeof feedSchema>;
