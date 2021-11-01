import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/users.entity';

export class AnotherUserDto extends PickType(User, [
  'id',
  'name',
  'profileImageUrl',
  'intro',
  'createdAt',
  'updatedAt',
  'skills',
] as const) {}
