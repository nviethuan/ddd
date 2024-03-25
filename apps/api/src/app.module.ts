import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'golang-api', transport: Transport.TCP, options: { port: 2223 } },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
