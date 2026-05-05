import { z } from 'zod';

// export const getTrademarksFilterSchema = z.object({
//   trademarkName: z.string().default(''),
//   productName: z.string().default(''),
//   productCode: z.string().default(''),
//   // nameAsc: z.boolean().default(true),
// });

export const getTrademarksListInputSchema = z.object({
  // filter: getTrademarksFilterSchema,
  trademarkName: z.string().default(''),
  productName: z.string().default(''),
  productCode: z.string().default(''),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// export type TGetTrademarksFilter = z.infer<typeof getTrademarksFilterSchema>;
export type TGetTrademarksListInput = z.infer<typeof getTrademarksListInputSchema>;
