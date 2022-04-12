import { PickType } from '@nestjs/swagger';
import { User } from '../../entities/users.entity';

export class UserDto extends PickType(User, [
  'id',
  'name',
  'profileImageUrl',
  'intro',
  'email',
  'createdAt',
  'updatedAt',
  'skills',
] as const) {}
