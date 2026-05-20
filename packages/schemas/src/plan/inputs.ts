import { z } from 'zod';

export const deleteBoilPlanSchema = z.object({
  boilId: z.number(),
});

export type TDeleteBoilPlanInput = z.infer<typeof deleteBoilPlanSchema>;
