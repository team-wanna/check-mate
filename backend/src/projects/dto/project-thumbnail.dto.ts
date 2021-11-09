import { PickType } from '@nestjs/swagger';
import { Project } from 'src/entities/projects.entity';

export class ProjectThumbnailDto extends PickType(Project, [
  'id',
  'title',
  'logoImageUrl',
  'intro',
  'location',
  'isClosed',
  'createdAt',
  'updatedAt',
  'skills',
] as const) {}
