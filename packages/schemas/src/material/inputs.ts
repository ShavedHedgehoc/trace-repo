import { z } from 'zod';

export const getMaterialsListInputSchema = z.object({
  productId: z.string().default(''),
  productName: z.string().default(''),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type TGetMaterialsListInput = z.infer<typeof getMaterialsListInputSchema>;
