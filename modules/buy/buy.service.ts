import { SUBSCRIBER } from '@app/redis-client';
import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Logger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class BuyService {
  constructor(
    @Inject(SUBSCRIBER)
    private readonly redis: Redis,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(BuyService.name);
    this.redis.subscribe('buy');
    this.run();
  }

  run() {
    this.redis.on('message', (channel, message) => {
      if (channel === 'buy') {
        this.logger.info(message);
      }
    });
  }
}
