import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { Project } from '../entities/projects.entity';
import { ProjectsService } from './projects.service';
import { Skill } from 'src/entities/skills.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Skill]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
