import { SUBSCRIBER } from '@app/redis-client';
import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Logger } from 'nestjs-pino';

@Injectable()
export class BuyService {
  constructor(
    @Inject(SUBSCRIBER)
    private readonly redis: Redis,
    private readonly logger: Logger,
  ) {
    this.redis.subscribe('buy');
    this.run();
  }

  run() {
    this.redis.on('message', (channel, message) => {
      if (channel === 'buy') {
        this.logger.log(message);
      }
    });
  }
}
