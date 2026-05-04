import { initTRPC } from '@trpc/server';
import type { ITrpcContext } from './types';
import superjson from 'superjson';

const t = initTRPC.context<ITrpcContext>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;
