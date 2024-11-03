import { Module } from '@nestjs/common';
import { SystemService } from './application/services/system.service';
import { SystemController } from './infrastructure/controllers/system.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CALCULATE_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'calculate',
          protoPath: join(__dirname, '../../../prosessor/proto/calculate.proto'),
          url: '0.0.0.0:50051',
        },
      },
    ]),
  ],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
