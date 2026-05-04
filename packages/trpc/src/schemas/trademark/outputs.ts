import { z } from 'zod';

export const trademarksListRowSchema = z.object({
  trademarkId: z.number(),
  productId: z.string(),
  trademarkName: z.string(),
  productName: z.string()
});

export const trademarksListResponseSchema = z.object({
  rows: z.array(trademarksListRowSchema),
  total: z.number(),
  totalPages: z.number()
});


export type TTrademarkListRow = z.infer<typeof trademarksListRowSchema>;
export type TTrademarkListResponse = z.infer<typeof trademarksListResponseSchema>;
