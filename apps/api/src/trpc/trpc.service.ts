import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { ITrpcContext } from '@repo/trpc';
import { TrademarkService } from '../trademark/trademark.service';
import { BoilService } from '../boil/boil.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TRegisteredUser } from '@repo/schemas';
import { CellService } from '../cell/cell.service';
import { MaterialService } from '../material/material.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { LotService } from '../lot/lot.service';
import { PlanService } from '../plan/plan.service';

@Injectable()
export class TrpcService {
  constructor(
    @Inject(forwardRef(() => BoilService)) private readonly boilService: BoilService,
    @Inject(forwardRef(() => TrademarkService)) private readonly trademarkService: TrademarkService,
    @Inject(forwardRef(() => CellService)) private readonly cellService: CellService,
    @Inject(forwardRef(() => MaterialService)) private readonly materailService: MaterialService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService,
    @Inject(forwardRef(() => LotService)) private readonly lotService: LotService,
    @Inject(forwardRef(() => PlanService)) private readonly planService: PlanService,
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
      cellService: this.cellService,
      materialService: this.materailService,
      userService: this.userService,
      roleService: this.roleService,
      lotService: this.lotService,
      planService: this.planService,
      user: user,
      req,
      res,
    };
  };
}
