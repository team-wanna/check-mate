import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './projects.entity';
import { User } from './users.entity';

@Entity()
export class Skill extends BaseEntity {
  @ApiProperty({
    description: '아이디',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '스킬 이름',
    example: 'TypeScript',
  })
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    description: '스킬 값',
    example: 'typescript',
  })
  @IsNotEmpty()
  @Column()
  value: string;

  // 관계 설정
  @ManyToMany(() => User, (users) => users.skills)
  users: User[];

  @ManyToMany(() => Project, (projects) => projects.skills)
  projects: Project[];
}
