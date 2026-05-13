import { z } from 'zod';

export const getTrademarksListInputSchema = z.object({
  trademarkName: z.string().default(''),
  productName: z.string().default(''),
  productCode: z.string().default(''),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type TGetTrademarksListInput = z.infer<typeof getTrademarksListInputSchema>;
