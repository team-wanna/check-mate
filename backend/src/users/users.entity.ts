import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Provider } from 'src/common/types/user.provider';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    description: '아이디',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '로그인 타입',
    example: 'google',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  provider: Provider;

  @ApiProperty({
    description: '이메일',
    example: '8annahxxl@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @ApiProperty({
    description: '이름(닉네임)',
    example: '심바',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'http://localhost:8080/media/users/simba1632737090988.jpg',
  })
  @IsString()
  @Column()
  profileImageUrl: string | null;

  @ApiProperty({
    description: '자기소개',
    example: 'http://localhost:8080/media/users/simba1632737090988.jpg',
  })
  @IsString()
  @Column()
  intro: string | null;

  @ApiProperty({
    description: '포지션',
    example: 'server',
  })
  @IsString()
  @Column()
  position: 'designer' | 'ios' | 'android' | 'web' | 'server' | null;

  @ApiProperty({
    description: '가입일',
    example: '2021-09-26T22:04:38.679Z',
  })
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2021-09-26T22:04:38.679Z',
  })
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '탈퇴일',
    example: 'null',
  })
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date | null;
}
