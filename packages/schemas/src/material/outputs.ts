import { z } from 'zod';

export const materialsListRowSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  lotCount: z.number(),
  boilCount: z.number(),
});

export const materialsListResponseSchema = z.object({
  rows: z.array(materialsListRowSchema),
  total: z.number(),
  totalPages: z.number(),
});

export type TMaterialsListRow = z.infer<typeof materialsListRowSchema>;
export type TMaterialsListResponse = z.infer<typeof materialsListResponseSchema>;
