import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  Delete,
  Req,
  NotFoundException,
  ForbiddenException,
  Res,
} from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { InterviewRecordsService } from './interviews.records.service';
import type {
  CreateInterviewDto,
  UpdateInterviewDto,
  InterviewEntity,
} from './interview.entity';
import type { InterviewRecordEntity } from './interview-record.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request, Response } from 'express';
import { detectInterviewChanges } from './utils/change-tracker';

@Controller('interviews')
export class InterviewsController {
  constructor(
    private readonly interviewsService: InterviewsService,
    private readonly recordsService: InterviewRecordsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Req() req: Request & { user: { sub: number; username: string } },
  ): Promise<InterviewEntity[]> {
    const userId = req.user.sub;
    return this.interviewsService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get('stats')
  async getStats(
    @Req() req: Request & { user: { sub: number; username: string } },
  ) {
    const userId = req.user.sub;
    return await this.interviewsService.getStats(userId);
  }

  @UseGuards(AuthGuard)
  @Get('recent')
  async getRecentActivity(
    @Req() req: Request & { user: { sub: number; username: string } },
  ) {
    const userId = req.user.sub;
    return await this.interviewsService.getRecentActivity(userId);
  }

  @UseGuards(AuthGuard)
  @Get('export')
  async exportCsv(
    @Req() req: Request & { user: { sub: number; username: string } },
    @Res() res: Response,
  ) {
    const userId = req.user.sub;
    const csvContent = await this.interviewsService.exportToCsv(userId);

    const dateSuffix = new Date().toISOString().split('T')[0];

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="interviews-${dateSuffix}.csv"`,
    );

    return res.send(csvContent);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request & { user: { sub: number; username: string } },
  ): Promise<InterviewEntity & { records: InterviewRecordEntity[] }> {
    const interview = await this.interviewsService.findOne(id);
    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    // Ensure the current user owns the interview
    const userId = req.user.sub;
    if (interview.userId !== userId) {
      // Do not reveal existence to unauthorized users - use Forbidden
      throw new ForbiddenException();
    }

    const records = await this.recordsService.findByInterview(id, userId);

    return { ...interview, records };
  }

  
/**
 * Creates a new interview record for a user
 * @param createInterviewDto - Interview data
 * @param userId - ID of the user creating the interview
 * @returns Created interview entity with generated ID
 * @throws {ConflictException} If interview already exists
 */
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createInterviewDto: CreateInterviewDto,
    @Req() req: Request & { user: { sub: number; username: string } },
  ): Promise<InterviewEntity> {
    const userId = req.user.sub;
    const interview = await this.interviewsService.create(
      createInterviewDto,
      userId,
    );
    await this.recordsService.create(interview.id, userId, {
      type: 'created',
      message: 'Interview created',
      metadata: {
        initialValues: {
          company: interview.company,
          position: interview.position,
          status: interview.status,
          type: interview.type,
          date: interview.date,
        },
      },
    });
    return interview;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInterviewDto: UpdateInterviewDto,
    @Req() req: Request & { user: { sub: number } },
  ): Promise<InterviewEntity> {
    const existing = await this.interviewsService.findOne(id);
    if (!existing || existing.userId !== req.user.sub) {
      throw new ForbiddenException();
    }

    // Detect changes BEFORE updating
    const changeResult = detectInterviewChanges(existing, updateInterviewDto);

    // Perform the update
    const interview = await this.interviewsService.update(
      id,
      updateInterviewDto,
    ) as InterviewEntity;

    // Create record with change details
    if (changeResult.hasChanges) {
      await this.recordsService.create(interview.id, interview.userId, {
        type: 'field_change',
        message: changeResult.message,
        metadata: {
          changes: changeResult.changes,
          changedFields: changeResult.changes.map((c) => c.field),
        },
      });
    }

    return interview;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number,  @Req() req: Request & { user: { sub: number } },): Promise<{ message: string }> {
    const existing = await this.interviewsService.findOne(id);
    if (!existing || existing.userId !== req.user.sub) {
      throw new ForbiddenException();
    }

    const deleted = await this.interviewsService.remove(id);
    if (!deleted) {
      throw new HttpException('Interview not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Interview deleted successfully' };
  }
}
