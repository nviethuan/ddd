import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('golang-api') private client: ClientProxy,
  ) {}

  @Get()
  async getHello() {
    const res = this.appService.getHello();
    return res;
  }
}
