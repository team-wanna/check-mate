import { PickType } from '@nestjs/swagger';
import { Project } from '../projects.entity';

export class ProjectDto extends PickType(Project, [
  'ownerId',
  'title',
  'logoImageUrl',
  'intro',
  'description',
  'location',
] as const) {}
