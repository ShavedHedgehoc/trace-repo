import { z } from 'zod';

export const SortableColumns = ['productName', 'productId', 'expDate', 'cellName', 'All'] as const;
export const getCellsContainListInputSchema = z.object({
  cellName: z.string().default(''),
  productId: z.string().default(''),
  productName: z.string().default(''),

  order: z.array(z.enum(SortableColumns)).default(['All']),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const deleteCellsContainRecordSchema = z.object({
  cellsContainId: z.number(),
});

export type TGetCellsContainListInput = z.infer<typeof getCellsContainListInputSchema>;
export type TDeleteCellsContainRecordInput = z.infer<typeof deleteCellsContainRecordSchema>;
