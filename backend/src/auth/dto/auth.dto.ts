import { User } from './../../users/users.entity';
import { PickType, ApiProperty } from '@nestjs/swagger';

export class AuthDto extends PickType(User, [
  'id',
  'name',
  'profileImageUrl',
] as const) {
  @ApiProperty({
    description: 'Access Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJJZCI6IjEwNjkxNDEwNTI0NjQwMjg5Njc1MyIsInN1YiI6MywiaWF0IjoxNjMzMzY1NjgwLCJleHAiOjE2MzM5NzA0ODB9.B30hIBMu1-wDZoQkEn6thG7u5ZWVqjNfaOkaRjikOak',
  })
  token: string;
}
