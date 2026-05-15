// # Main router
import { router } from '../trpc';
import { authRouter } from './auth';
import { boilRouter } from './boil';
import { cellRouter } from './cell';
import { materialRouter } from './material';
import { roleRouter } from './role';

import { trademarkRouter } from './trademark';
import { userRouter } from './user';

export const appRouter = router({
  boil: boilRouter,
  trademark: trademarkRouter,
  auth: authRouter,
  cell: cellRouter,
  material: materialRouter,
  user: userRouter,
  role: roleRouter,
});

export type AppRouter = typeof appRouter;
