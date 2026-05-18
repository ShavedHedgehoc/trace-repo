import { z } from 'zod';

export const getLotDetailInputSchema = z.object({
  lotId: z.number(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type TGetLotDetailInput = z.infer<typeof getLotDetailInputSchema>;
