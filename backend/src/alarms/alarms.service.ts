import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from 'src/entities/alarm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlarmsService {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmsRepository: Repository<Alarm>,
  ) {}

  async getAllAlarms(userId) {
    return this.alarmsRepository.find({ where: { targetId: userId } });
  }

  async createAlarm(userId, data) {
    const { type, projectId, targetId } = data;
    return this.alarmsRepository.save({
      type,
      projectId,
      senderId: userId,
      targetId,
    });
  }

  async updateAlarm(alarmId) {
    await this.alarmsRepository.update(alarmId, { isChecked: true });
    return this.alarmsRepository.find({ where: { id: alarmId } });
  }
}
