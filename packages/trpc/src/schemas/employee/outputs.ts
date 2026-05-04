import { z } from 'zod';

export const appOccupationSchema = z.object({
  id: z.number(),
  value: z.string(),
  description: z.string(),
});

export const appEmployeeSchema = z.object({
  id: z.number(),
  name: z.string(),
  barcode: z.string(),
  occupation: appOccupationSchema.nullable(),
});

export const appEmployeeResponseSchema = z.object({
  rows: z.array(appEmployeeSchema),
  total: z.number(),
});

export type TOccupationApp = z.infer<typeof appOccupationSchema>;
export type TEmployeeApp = z.infer<typeof appEmployeeSchema>;
export type TEmployeeAppResponse = z.infer<typeof appEmployeeResponseSchema>;
