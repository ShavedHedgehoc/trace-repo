import { z } from 'zod';

export const cellsContainListRowSchema = z.object({
  recordId: z.number(),
  cellId: z.number(),
  cellName: z.string(),
  productId: z.string(),
  productName: z.string(),
  lotId: z.number(),
  lotName: z.string(),
  expDate: z.date(),
});

export const cellsContainListResponseSchema = z.object({
  rows: z.array(cellsContainListRowSchema),
  total: z.number(),
  totalPages: z.number(),
});

export type TCellsContainListRow = z.infer<typeof cellsContainListRowSchema>;
export type TCellsContainListResponse = z.infer<typeof cellsContainListResponseSchema>;
