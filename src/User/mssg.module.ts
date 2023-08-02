import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MssgController } from './msg.controller';
import { MssgService } from './mssg.service';

import { Mssg } from './mssg.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Mssg])],
  controllers: [MssgController],
  providers: [MssgService],
})
export class MssgModule {}
