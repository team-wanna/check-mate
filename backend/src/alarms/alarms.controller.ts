import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Alarm } from 'src/entities/alarm.entity';
import { AlarmsService } from './alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@ApiTags('Alarm')
@Controller('api/alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @ApiOperation({ summary: '현재 사용자의 모든 알람 가져오기' })
  @ApiResponseDto(Alarm)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllAlarms(@CurrentUser() user) {
    return this.alarmsService.getAllAlarms(user.id);
  }

  @ApiOperation({ summary: '(프로젝트 가입 신청/수락/거절) 알람 생성하기' })
  @ApiResponseDto(Alarm)
  @UseGuards(JwtAuthGuard)
  @Post()
  createAlarm(@CurrentUser() user, @Body() body: CreateAlarmDto) {
    return this.alarmsService.createAlarm(user.id, body);
  }

  @ApiOperation({ summary: '알람 읽음 처리하기' })
  @ApiResponseDto(Alarm)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateAlarm(@CurrentUser() user, @Param('id', ParseIntPipe) alarmId: number) {
    return this.alarmsService.updateAlarm(user.id, alarmId);
  }
}
