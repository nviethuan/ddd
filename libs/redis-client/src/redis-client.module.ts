import { Module, Provider } from '@nestjs/common';
import { RedisClientService } from './redis-client.service';
import Redis, { RedisOptions } from 'ioredis';

export const PUBLISHER = Symbol('PUBLISHER');
export const SUBSCRIBER = Symbol('SUBSCRIBER');

@Module({})
export class RedisClientModule {
  static forRoot(opt: RedisOptions) {
    const provider: Provider[] = [
      {
        provide: PUBLISHER,
        useFactory: () => new Redis(opt),
      },
      {
        provide: SUBSCRIBER,
        useFactory: () => new Redis(opt),
      },
      RedisClientService,
    ];

    return {
      module: RedisClientModule,
      providers: provider,
      exports: provider,
      global: true,
    };
  }
}
