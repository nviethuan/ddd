import { Module } from '@nestjs/common';
import KeyvRedis from '@keyv/redis';

export type RedisCacheOptions = {
  host: string;
  port: number;
  username: string;
  password: string;
};

@Module({})
export class RedisCacheModule {
  static forRoot(opt: RedisCacheOptions) {
    const provider = {
      provide: KeyvRedis,
      useFactory: () =>
        new KeyvRedis(`redis://${opt.username}:${opt.password}@${opt.host}:${opt.port}`, {
          useRedisSets: false,
        }),
    };

    return {
      module: RedisCacheModule,
      providers: [provider],
      exports: [provider],
      global: true,
    };
  }
}
