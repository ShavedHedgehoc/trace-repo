import { z } from 'zod';

export const lotDataSchema = z.object({
  lotId: z.number(),
  lotName: z.string(),
  sellerId: z.number(),
  sellerName: z.string(),
  manufacturerId: z.number(),
  manufacturerName: z.string(),
  manufacturerLotId: z.number(),
  manufacturerLotName: z.string(),
  trademarkId: z.number(),
  trademarkName: z.string(),
});

export const lotDetailBoilRowSchema = z.object({
  boilId: z.number(),
  boilDate: z.date(),
  batchName: z.string(),
  productId: z.string(),
  productMarking: z.string(),
  plantAbb: z.string(),
  hasPlan: z.boolean(),
});

export const lotDetailResponseSchema = z.object({
  data: lotDataSchema,
  rows: z.array(lotDetailBoilRowSchema),
  total: z.number(),
  totalPages: z.number(),
});

export type TLotDetailData = z.infer<typeof lotDataSchema>;
export type TLotDetailBoilRow = z.infer<typeof lotDetailBoilRowSchema>;
export type TLotDetailResponse = z.infer<typeof lotDetailResponseSchema>;
