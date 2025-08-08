import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewsModule } from './interviews/interviews.module';

@Module({
  imports: [InterviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
