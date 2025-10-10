import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Interview Tracker</title></head><body><h1>Hello World!</h1></body></html>';
  }
}
