import {
  Controller,
  Get,
  Post,
  // Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import type {
  //Interview,
  CreateInterviewDto,
  // UpdateInterviewDto,
  InterviewEntity,
} from './interview.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<InterviewEntity[]> {
    return this.interviewsService.findAll();
  }

  @Get('stats')
  async getStats() {
    return await this.interviewsService.getStats();
  }

  @Get('recent')
  async getRecentActivity() {
    return await this.interviewsService.getRecentActivity();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Interview {
  //   const interview = this.interviewsService.findOne(id);
  //   if (!interview) {
  //     throw new HttpException('Interview not found', HttpStatus.NOT_FOUND);
  //   }
  //   return interview;
  // }

  @Post()
  async create(
    @Body() createInterviewDto: CreateInterviewDto,
  ): Promise<InterviewEntity> {
    return await this.interviewsService.create(createInterviewDto);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateInterviewDto: UpdateInterviewDto,
  // ): Interview {
  //   const interview = this.interviewsService.update(id, updateInterviewDto);
  //   if (!interview) {
  //     throw new HttpException('Interview not found', HttpStatus.NOT_FOUND);
  //   }
  //   return interview;
  // }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const deleted = await this.interviewsService.remove(id);
    if (!deleted) {
      throw new HttpException('Interview not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Interview deleted successfully' };
  }
}
