import { PickType } from '@nestjs/swagger';
import { User } from '../../entities/users.entity';

export class UserDto extends PickType(User, [
  'id',
  'provider',
  'subId',
  'name',
  'profileImageUrl',
  'intro',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
