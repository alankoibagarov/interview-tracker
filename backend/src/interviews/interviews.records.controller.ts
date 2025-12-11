import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  InterviewRecordsService,
  type CreateInterviewRecordDto,
} from './interviews.records.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';

@Controller('interviews/:interviewId/records')
export class InterviewRecordsController {
  constructor(private readonly recordsService: InterviewRecordsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Param('interviewId', ParseIntPipe) interviewId: number,
    @Req() req: Request & { user: { sub: number; username: string } },
  ) {
    const userId = req.user.sub;
    return await this.recordsService.findByInterview(interviewId, userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Param('interviewId', ParseIntPipe) interviewId: number,
    @Body() dto: CreateInterviewRecordDto,
    @Req() req: Request & { user: { sub: number; username: string } },
  ) {
    const userId = req.user.sub;
    return await this.recordsService.create(interviewId, userId, dto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('interviewId', ParseIntPipe) interviewId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const record = await this.recordsService.findOne(id);
    if (record?.interviewId !== interviewId) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('interviewId', ParseIntPipe) interviewId: number,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request & { user: { sub: number; username: string } },
  ) {
    const userId = req.user.sub;
    const ok = await this.recordsService.remove(id, userId);
    if (!ok) {
      throw new NotFoundException('Record not found');
    }
    return { message: 'Record deleted' };
  }
}
