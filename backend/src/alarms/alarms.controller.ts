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
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiResponseDto } from 'src/common/decorators/api-response-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
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
    return this.alarmsService.getAllAlarms(user.id);
  }

  @ApiOperation({ summary: '알람 생성하기' })
  @ApiOkResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @Post()
  createAlarm(
    @CurrentUser() user,
    @Body() body, //TODO: Type 추가하기
  ) {
    return this.alarmsService.createAlarm(user.id, body);
  }

  @ApiOperation({ summary: '알람 읽음 처리하기' })
  // @ApiResponseDto()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateAlarm(@CurrentUser() user, @Param('id', ParseIntPipe) alarmId: number) {
    return this.alarmsService.updateAlarm(alarmId);
  }
}
