import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Alarm extends BaseEntity {
  @ApiProperty({
    description: '아이디',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '알람 종류 (apply/accept/refuse)',
    example: 'apply',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  type: 'apply' | 'accept' | 'refuse';

  @ApiProperty({
    description: '프로젝트 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Column({ name: 'project_id' })
  projectId: number;

  @ApiProperty({
    description: '보낸 사람 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Column({ name: 'sender_id' })
  senderId: number;

  @ApiProperty({
    description: '받는 사람 아이디',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Column({ name: 'target_id' })
  targetId: number;

  @ApiProperty({
    description: '확인함',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  @Column({ name: 'is_checked', default: false })
  isChecked: boolean;

  @ApiProperty({
    description: '발신일',
    example: '2021-09-26T22:04:38.679Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
