import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from 'src/entities/alarm.entity';
import { Project } from 'src/entities/projects.entity';
import { getConnection, Repository } from 'typeorm';

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
    if (type === 'accept') {
      // 관계 테이블에 추가
      await getConnection()
        .createQueryBuilder()
        .relation(Project, 'members')
        .of(projectId)
        .add(targetId);
    }
    return [
      await this.alarmsRepository.save({
        type,
        projectId,
        senderId: userId,
        targetId,
      }),
    ];
  }

  async updateAlarm(userId, alarmId) {
    const alarm = await this.alarmsRepository.findOne(alarmId);
    if (alarm.targetId !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    await this.alarmsRepository.update(alarmId, { isChecked: true });
    return this.alarmsRepository.find({ where: { id: alarmId } });
  }
}
