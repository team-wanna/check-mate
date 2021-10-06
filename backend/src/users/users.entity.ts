import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
  provider: string;

  @ApiProperty({
    description: '서브 아이디',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'sub_id' })
  subId: string;

  @ApiProperty({
    description: '이름(닉네임)',
    example: '심바',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ default: null })
  name: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'http://localhost:8080/media/users/simba1632737090988.jpg',
  })
  @IsString()
  @Column({ name: 'profile_image_url', default: null })
  profileImageUrl: string | null;

  @ApiProperty({
    description: '자기소개',
    example: '서버 개발자 심바입니다 😎',
  })
  @IsString()
  @Column({ default: null })
  intro: string | null;

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
    default: null,
  })
  deletedAt: Date | null;
}
