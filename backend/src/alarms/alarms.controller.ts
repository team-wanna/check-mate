import {
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AlarmType } from 'src/common/types/AlarmType';
import { AlarmsService } from './alarms.service';

@ApiTags('Alarm')
@Controller('api/alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @ApiOperation({ summary: '현재 사용자의 모든 알람 가져오기' })
  // @ApiResponseDto()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllAlarms(@CurrentUser() user) {
    return this.alarmsService.getAllAlarms();
  }

  @ApiOperation({ summary: '하나의 알람 가져오기' })
  // @ApiResponseDto()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getAlarm(@CurrentUser() user) {
    return this.alarmsService.getAlarm();
  }

  @ApiOperation({ summary: '알람 생성하기' })
  @ApiOkResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'type',
    required: true,
    description: '알람 타입 (apply/accept/refuse)',
  })
  @ApiQuery({
    name: 'projectId',
    required: true,
    description: '프로젝트 아이디',
  })
  @Post(':id')
  createAlarm(
    @CurrentUser() user,
    @Query('type') type: AlarmType,
    @Query('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.alarmsService.createAlarm();
  }

  @ApiOperation({ summary: '알람 읽음 처리하기' })
  // @ApiResponseDto()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateAlarm(@CurrentUser() user) {
    return this.alarmsService.updateAlarm();
  }
}
