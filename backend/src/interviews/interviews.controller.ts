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
} from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import type {
  CreateInterviewDto,
  UpdateInterviewDto,
  InterviewEntity,
} from './interview.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

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
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request & { user: { sub: number; username: string } },
  ): Promise<InterviewEntity> {
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

    return interview;
  }

  @Post()
  async create(
    @Body() createInterviewDto: CreateInterviewDto,
    @Req() req: Request & { user: { sub: number; username: string } },
  ): Promise<InterviewEntity> {
    const userId = req.user.sub;
    return await this.interviewsService.create(createInterviewDto, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ): Promise<InterviewEntity> {
    const interview = await this.interviewsService.update(
      id,
      updateInterviewDto,
    );
    if (!interview) {
      throw new HttpException('Interview not found', HttpStatus.NOT_FOUND);
    }
    return interview;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const deleted = await this.interviewsService.remove(id);
    if (!deleted) {
      throw new HttpException('Interview not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Interview deleted successfully' };
  }
}
