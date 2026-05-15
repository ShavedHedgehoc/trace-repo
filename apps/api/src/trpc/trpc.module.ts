import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { TrademarkModule } from '../trademark/trademark.module';
import { BoilModule } from '../boil/boil.module';
import { AuthModule } from '../auth/auth.module';
import { CellModule } from '../cell/cell.module';
import { MaterialModule } from '../material/material.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    BoilModule,
    TrademarkModule,
    AuthModule,
    CellModule,
    MaterialModule,
    UserModule,
    RoleModule,
  ],
  providers: [
    {
      provide: 'TRPC_SERVICE',
      useClass: TrpcService,
    },
  ],
  controllers: [TrpcController],
})
export class TrpcModule {}
