import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SkillsService } from './skills.service';

@Controller('api/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({ summary: '스킬 검색' })
  @Get()
  searchSkill(@Query('search') search: string) {
    return this.skillsService.searchSkill(search);
  }
}
