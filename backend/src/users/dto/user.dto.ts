import { PickType } from '@nestjs/swagger';
import { User } from '../users.entity';

export class UserDto extends PickType(User, [
  'id',
  'provider',
  'email',
  'name',
  'profileImageUrl',
  'intro',
  'position',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
