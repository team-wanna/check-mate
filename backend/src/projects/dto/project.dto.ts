import { PickType } from '@nestjs/swagger';
import { Project } from '../../entities/projects.entity';

export class ProjectDto extends PickType(Project, [
  'id',
  'ownerId',
  'title',
  'logoImageUrl',
  'intro',
  'description',
  'location',
  'isClosed',
  'createdAt',
  'updatedAt',
] as const) {}
