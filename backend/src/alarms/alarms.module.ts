import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from 'src/entities/alarm.entity';
import { AlarmsService } from './alarms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm])],
  providers: [AlarmsService],
})
export class AlarmsModule {}
