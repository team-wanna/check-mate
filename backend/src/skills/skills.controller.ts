import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { Skill } from 'src/entities/skills.entity';
import { SkillsService } from './skills.service';

@ApiTags('Skill')
@Controller('api/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({ summary: '스킬 검색하기' })
  @ApiResponseDto(Skill)
  @ApiQuery({
    name: 'search',
    required: false,
    description: '비어있을 경우 모든 스킬 리턴',
  })
  @Get()
  searchSkill(@Query('search') search: string) {
    return this.skillsService.searchSkill(search);
  }
}
