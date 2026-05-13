// # Main router
import { router } from '../trpc';
import { authRouter } from './auth';
import { boilRouter } from './boil';

import { trademarkRouter } from './trademark';

export const appRouter = router({
  boil: boilRouter,
  trademark: trademarkRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
