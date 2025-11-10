import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewsModule } from './interviews/interviews.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes process.env available everywhere
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? path.resolve(__dirname, '../../.env.local')
          : path.resolve(__dirname, '../../.env'),
    }),
    InterviewsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ good for dev, but turn OFF in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
