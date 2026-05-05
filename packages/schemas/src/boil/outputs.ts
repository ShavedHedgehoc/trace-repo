import { z } from 'zod';

export const boilsListRowSchema = z.object({
    boilId: z.number(),
    boilDate: z.date(),
    batchName: z.string(),
    productId: z.string(),
    productMarking: z.string(),
    plantAbb: z.string(),
});

export const boilsListResponseSchema = z.object({
    rows: z.array(boilsListRowSchema),
    total: z.number(),
    totalPages: z.number(),
});

export type TBoilListRow = z.infer<typeof boilsListRowSchema>;
export type TBoilListResponse = z.infer<typeof boilsListResponseSchema>;