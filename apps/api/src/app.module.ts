import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TrpcModule } from './trpc/trpc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '../../', `.env.${process.env.NODE_ENV}`),
    }),
    TrpcModule,
  ],
})
export class AppModule { }
