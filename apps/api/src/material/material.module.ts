import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';

@Module({
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}
