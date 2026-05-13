import { Module } from '@nestjs/common';
import { BoilService } from './boil.service';

@Module({
  providers: [BoilService],
  exports: [BoilService],
})
export class BoilModule {}
