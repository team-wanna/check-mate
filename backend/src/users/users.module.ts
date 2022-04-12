import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../entities/users.entity';
import { UsersService } from './users.service';
import { Skill } from 'src/entities/skills.entity';
import { AwsService } from 'src/aws/aws.service';
import { ProjectsService } from 'src/projects/projects.service';
import { Project } from 'src/entities/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Skill, Project])],
  controllers: [UsersController],
  providers: [UsersService, AwsService, ProjectsService],
})
export class UsersModule {}
