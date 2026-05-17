import { loginSchema, loginTrpcResponseSchema, registerSchema, userSchema } from '@repo/schemas';
import { TRPCError } from '@trpc/server';
import { protectedProcedure, publicProcedure, router } from '../../trpc';

const COOKIE_NAME = 'refreshToken';

export const authRouter = router({
  login: publicProcedure
    .input(loginSchema)
    .output(loginTrpcResponseSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await ctx.authService.login(input);
        // const isProduction = process.env.NODE_ENV === 'production';
        ctx.res.setHeader(
          'Set-Cookie',
          `${COOKIE_NAME}=${result.refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`,
        );
        // ctx.res.setHeader(
        //   'Set-Cookie',
        //   `refreshToken=${result.refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${isProduction ? '; Secure' : ''}`,
        // );
        return {
          user: result.user,
          accessToken: result.accessToken,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: error.status === 404 ? 'NOT_FOUND' : 'UNAUTHORIZED',
          message: error.message || 'Ошибка авторизации',
          cause: error,
        });
      }
    }),

  register: publicProcedure
    .input(registerSchema)
    .output(loginTrpcResponseSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await ctx.authService.register(input);
        // const isProduction = process.env.NODE_ENV === 'production';
        // ctx.res.setHeader(
        //   'Set-Cookie',
        //   `refreshToken=${result.refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${isProduction ? '; Secure' : ''}`,
        // );
        ctx.res.setHeader(
          'Set-Cookie',
          `${COOKIE_NAME}=${result.refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`,
        );
        return {
          user: result.user,
          accessToken: result.accessToken,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: error.status === 404 ? 'NOT_FOUND' : 'UNAUTHORIZED',
          message: error.message || 'Ошибка авторизации',
          cause: error,
        });
      }
    }),

  me: protectedProcedure.output(userSchema).query(async ({ ctx }) => {
    return await ctx.authService.me(ctx.user.id);
  }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    try {
      const refreshToken = ctx.req.cookies?.refreshToken;

      if (refreshToken) {
        await ctx.authService.logout(refreshToken);
      }
      // const isProduction = process.env.NODE_ENV === 'production';
      // ctx.res.setHeader(
      //   'Set-Cookie',
      //   `refreshToken=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict${isProduction ? '; Secure' : ''}`,
      // );
      ctx.res.setHeader(
        'Set-Cookie',
        `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`,
      );
      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Не удалось выйти из системы',
      });
    }
  }),

  refresh: publicProcedure.mutation(async ({ ctx }) => {
    try {
      ctx.res.setHeader('Access-Control-Allow-Credentials', 'true');

      const oldRefreshToken = ctx.req.cookies?.refreshToken;
      if (!oldRefreshToken) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Сессия отсутствует' });
      }

      const result = await ctx.authService.refresh(oldRefreshToken);
      // const isProduction = process.env.NODE_ENV === 'production';

      // ctx.res.setHeader(
      //   'Set-Cookie',
      //   `refreshToken=${result.refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${isProduction ? '; Secure' : ''}`,
      // );
      ctx.res.setHeader(
        'Set-Cookie',
        `${COOKIE_NAME}=${result.refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`,
      );
      return { accessToken: result.accessToken, user: result.user };
    } catch (error: any) {
      console.error('=== КРИТИЧЕСКАЯ ОШИБКА REFRESH ===', error);

      ctx.res.setHeader(
        'Set-Cookie',
        `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`,
      );

      if (error instanceof Error && error.message === 'Сессия истекла') {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Сессия истекла, войдите заново',
        });
      }

      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: 'FORBIDDEN',
        message: error.message || 'Критическая ошибка сессии',
      });
    }
  }),
});
