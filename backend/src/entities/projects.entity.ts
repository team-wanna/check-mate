import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
export class Project extends BaseEntity {
  @ApiProperty({
    description: '아이디',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '프로젝트 생성자',
    example: '심바',
  })
  @IsNotEmpty()
  @IsNumber()
  @Column({ name: 'owner_id' })
  ownerId: number;

  @ApiProperty({
    description: '프로젝트 카드 등록 제목',
    example: 'Vue3와 NestJS로 웹 서비스 개발 하실 분 🙋‍♀️',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @ApiProperty({
    description: '프로젝트 로고 이미지 URL',
    example: 'http://localhost:8080/media/projects/friend1632928913936.PNG',
  })
  @Column({ name: 'logo_image_url', default: null })
  logoImageUrl: string | null;

  @ApiProperty({
    description: '프로젝트 한 줄 소개',
    example:
      '체크 메이트는 Check(살피다) + Mate(친구)의 합성어로 사이드 프로젝트 or 스터디 매칭을 도와주는 서비스 입니다 👭',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  intro: string;

  @ApiProperty({
    description: '프로젝트 상세 설명',
    example:
      '함께 웹 서비스 개발 하실 분 모집합니다!!\n\n회의는 온라인으로 진행할 예정이고 시간은 아직 미정이며,\n지원하실분은 🔴🔺🟥로 들어와 주시기 바랍니다🤗',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  description: string;

  @ApiProperty({
    description: '프로젝트 진행 지역',
    example: '온라인',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  location: string;

  @ApiProperty({
    description: '프로젝트 지원자 수',
    example: '2',
  })
  @Column({ name: 'applicant_count', default: 0 })
  applicantCount: number;

  @ApiProperty({
    description: '프로젝트 마감 여부',
    example: 'N',
  })
  @IsNotEmpty()
  @IsBoolean()
  @Column({ name: 'is_closed', default: false })
  isClosed: boolean;

  @ApiProperty({
    description: '등록일',
    example: '2021-09-26T22:04:38.679Z',
  })
  @IsNotEmpty()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2021-09-26T22:04:38.679Z',
  })
  @IsNotEmpty()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '삭제일',
    example: 'null',
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    default: null,
  })
  deletedAt: Date | null;
}
