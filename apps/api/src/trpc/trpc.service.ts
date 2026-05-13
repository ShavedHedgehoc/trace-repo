import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { ITrpcContext } from '@repo/trpc';
import { TrademarkService } from '../trademark/trademark.service';
import { BoilService } from '../boil/boil.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TRegisteredUser } from '@repo/schemas';

@Injectable()
export class TrpcService {
  constructor(
    @Inject(forwardRef(() => BoilService)) private readonly boilService: BoilService,
    @Inject(forwardRef(() => TrademarkService)) private readonly trademarkService: TrademarkService,
    // private readonly moduleRef: ModuleRef
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
  ) {}

  createContext = async (_opts: trpcExpress.CreateExpressContextOptions): Promise<ITrpcContext> => {
    const { req, res } = _opts;
    let user: TRegisteredUser | null = null;

    try {
      const authHeader = req?.headers?.authorization;

      if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];
        const jwtService = new JwtService();
        const payload: TRegisteredUser = await jwtService.verifyAsync(token, {
          secret: 'JWT_ACCESS_SECRET',
        });
        user = payload;
      }
    } catch (_error) {
      // console.log(error);
    }

    return {
      trademarkService: this.trademarkService,
      boilService: this.boilService,
      authService: this.authService,
      user: user,
      req,
      res,
    };
  };
}
