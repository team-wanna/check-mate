import { PickType } from '@nestjs/swagger';
import { Alarm } from 'src/entities/alarm.entity';

export class CreateAlarmDto extends PickType(Alarm, [
  'type',
  'projectId',
  'targetId',
]) {}
