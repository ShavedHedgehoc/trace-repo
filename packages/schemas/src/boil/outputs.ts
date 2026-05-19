import { z } from 'zod';

export const weightingResultSchema = z.object({
  productId: z.string(),
  productMarking: z.string().nullable(),
  productName: z.string().nullable(),
  planQty: z.number(),
  factQty: z.number(),
  loadQty: z.number(),
});

export const boilsListRowSchema = z.object({
  boilId: z.number(),
  boilDate: z.date(),
  batchName: z.string(),
  productId: z.string(),
  productMarking: z.string(),
  plantAbb: z.string(),
  weightingResult: z.array(weightingResultSchema),
  wCheck: z.boolean(),
  lCheck: z.boolean(),
});

export const boilsListResponseSchema = z.object({
  rows: z.array(boilsListRowSchema),
  total: z.number(),
  totalPages: z.number(),
});

export const boilsStatsResponseSchema = z.object({
  totalBoilsPsk: z.number(),
  totalBoilsKlp: z.number(),
  totalLoadsPsk: z.number(),
  totalLoadsKlp: z.number(),
  totalLoadActionsPsk: z.number(),
  totalLoadActionsKlp: z.number(),
});

export const weightingRowSchema = z.object({
  code: z.string(),
  name: z.string().nullable(),
  marking: z.string().nullable(),
  lotId: z.number(),
  lot: z.string(),
  weight: z.number().nullable(),
  user: z.string(),
  date: z.date(),
});
export const loadRowSchema = z.object({
  code: z.string(),
  name: z.string(),
  lot: z.string().nullable(),
  weight: z.number().nullable(),
  user: z.string(),
  date: z.date(),
});

export const techCardRowSchema = z.object({
  code: z.string(),
  name: z.string(),
  lot: z.string().nullable(),
  temp: z.number().nullable(),
  weight: z.number().nullable(),
  user: z.string(),
  date: z.date(),
  isOperation: z.boolean(),
});

export const boilDetailResponseSchema = z.object({
  boilId: z.number(),
  boilDate: z.date(),
  batchName: z.string(),
  productId: z.string(),
  productMarking: z.string(),
  plantAbb: z.string(),
  summary: z.array(weightingResultSchema),
  weightings: z.array(weightingRowSchema).nullable(),
  loads: z.array(loadRowSchema).nullable(),
  techCard: z.array(techCardRowSchema).nullable(),
});

export type TBoilListWeightingResult = z.infer<typeof weightingResultSchema>;
export type TBoilListRow = z.infer<typeof boilsListRowSchema>;
export type TBoilListResponse = z.infer<typeof boilsListResponseSchema>;
export type TBoilStatsResponse = z.infer<typeof boilsStatsResponseSchema>;
export type TBoilDetailWeightingRow = z.infer<typeof weightingRowSchema>;
export type TBoilDetailLoadRow = z.infer<typeof loadRowSchema>;
export type TBoilDetailTechCardRow = z.infer<typeof techCardRowSchema>;
export type TBoilDetailResponse = z.infer<typeof boilDetailResponseSchema>;
