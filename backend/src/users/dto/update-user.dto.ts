import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../users.entity';

export class UpdateUserDto extends PartialType(
  PickType(User, ['name', 'intro'] as const),
) {}
