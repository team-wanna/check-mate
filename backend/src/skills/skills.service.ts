import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/entities/skills.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private skillsRepository: Repository<Skill>,
  ) {}

  async searchSkill(search) {
    if (search == null) {
      return this.skillsRepository.find();
    }
    return this.skillsRepository.query(`
      SELECT *
      FROM skill
      WHERE name LIKE '%${search}%'
    `);
  }
}
