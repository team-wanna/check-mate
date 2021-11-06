import { PartialType, PickType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(
  PickType(CreateProjectDto, [
    'title',
    'intro',
    'description',
    'location',
  ] as const),
) {}
