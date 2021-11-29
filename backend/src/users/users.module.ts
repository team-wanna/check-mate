import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../entities/users.entity';
import { UsersService } from './users.service';
import { Skill } from 'src/entities/skills.entity';
import { AwsService } from 'src/aws/aws.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Skill])],
  controllers: [UsersController],
  providers: [UsersService, AwsService],
})
export class UsersModule {}
