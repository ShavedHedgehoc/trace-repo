import { getMaterialsListInputSchema, materialsListResponseSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';

export const materialRouter = router({
  list: publicProcedure
    .input(getMaterialsListInputSchema)
    .output(materialsListResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.materialService.getMaterials(input);
    }),
});
