import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { Project } from '../entities/projects.entity';
import { ProjectsService } from './projects.service';
import { Skill } from 'src/entities/skills.entity';
import { AwsService } from 'src/aws/aws.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Skill])],
  controllers: [ProjectsController],
  providers: [ProjectsService, AwsService],
})
export class ProjectsModule {}
