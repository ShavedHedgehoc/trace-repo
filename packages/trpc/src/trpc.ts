import { initTRPC, TRPCError } from '@trpc/server';
import type { ITrpcContext } from './types';
import superjson from 'superjson';

const t = initTRPC.context<ITrpcContext>().create({ transformer: superjson });

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { user: ctx.user } });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
