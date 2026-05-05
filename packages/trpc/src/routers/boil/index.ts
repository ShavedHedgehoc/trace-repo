import { boilsListResponseSchema, getBoilsListInputSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';

export const boilRouter = router({
    list: publicProcedure
        .input(getBoilsListInputSchema)
        .output(boilsListResponseSchema)
        .query(async ({ ctx, input }) => {
            return ctx.boilServise.getBoils(input);
        }),
});
