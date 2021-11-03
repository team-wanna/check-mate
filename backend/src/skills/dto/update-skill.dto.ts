import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillDto {
  @ApiProperty({
    description: '스킬명',
    example: 'TypeScript',
  })
  skillName: string;
}
