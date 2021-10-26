import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../entities/users.entity';
import { UsersService } from './users.service';
import { Skill } from 'src/entities/skills.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Skill]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
