import { Project } from 'src/entities/projects.entity';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(
  PickType(Project, [
    'title',
    'intro',
    'description',
    'location',
    'isClosed',
  ] as const),
) {}
