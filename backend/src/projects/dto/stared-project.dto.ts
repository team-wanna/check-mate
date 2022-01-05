import { PickType } from '@nestjs/swagger';
import { Project } from 'src/entities/projects.entity';

export class StaredProjectDto extends PickType(Project, [
  'id',
  'title',
  'logoImageUrl',
] as const) {}
