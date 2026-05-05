import { z } from 'zod'

export const getBoilsListInputSchema = z.object({
    batchName: z.string().default(''),
    productId: z.string().default(''),
    productMarking: z.string().default(''),
    startDate: z.coerce.date().default(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1)
    }),
    endDate: z.coerce.date().default(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0)
    }),
    plants: z.array(z.string()).nullish(),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
})

export type TGetBoilsListInput = z.infer<typeof getBoilsListInputSchema>