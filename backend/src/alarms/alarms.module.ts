import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from 'src/entities/alarm.entity';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from './alarms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm])],
  providers: [AlarmsService],
  controllers: [AlarmsController],
})
export class AlarmsModule {}
