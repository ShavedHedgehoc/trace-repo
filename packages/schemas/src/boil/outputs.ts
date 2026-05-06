import { z } from 'zod';


export const weightingResultSchema = z.object({
    productId: z.string(),
    productMarking: z.string().nullable(),
    productName: z.string().nullable(),
    planQty: z.number(),
    factQty: z.number(),
    loadQty: z.number(),
})

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
    noPlan: z.boolean(),
});

export const boilsListResponseSchema = z.object({
    rows: z.array(boilsListRowSchema),
    total: z.number(),
    totalPages: z.number(),
});

export type TBoilListWeightingResult = z.infer<typeof weightingResultSchema>;
export type TBoilListRow = z.infer<typeof boilsListRowSchema>;
export type TBoilListResponse = z.infer<typeof boilsListResponseSchema>;