import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('mail')
  @HttpCode(201)
  async sendMail(@Body() message) {
    return this.appService.sendMessage(message);
  }
}
