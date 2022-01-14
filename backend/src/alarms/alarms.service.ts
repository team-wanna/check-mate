import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from 'src/entities/alarm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlarmsService {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmsRepository: Repository<Alarm>,
  ) {}

  getAlarm() {}

  createAlarm() {}

  updateAlarm() {}

  deleteAlarm() {}
}
