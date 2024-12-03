import { MongodbModule } from '@libs/mongodb';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import {
  KEYV__REDIS__HOST,
  KEYV__REDIS__PASSWORD,
  KEYV__REDIS__PORT,
  KEYV__REDIS__USERNAME,
  MONGODB__DATABASE,
  MONGODB__URI,
  REDIS__CLIENT__PASSWORD,
  REDIS__CLIENT__USERNAME,
  REDIS__CLIENT__PORT,
  REDIS__CLIENT__HOST,
} from 'common/src/configs/envs';
import { UserModule } from '@modules/user/user.module';
import { WalletModule } from '@modules/wallet/wallet.module';
import { RedisCacheModule } from '@app/redis-cache';
import { AuthModule } from '@modules/auth/auth.module';
import { RedisClientModule } from '@app/redis-client';
import { BuyModule } from '@modules/buy/buy.module';
import { BinanceSubModule } from '@modules/binance-sub/binance-sub.module';
import { SystemModule } from '@modules/system/system.module';
import { HealthModule } from '@modules/health/health.module';
import { ResourceModule } from '@modules/resource/resource.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: process.env.NO_COLOR !== 'true',
          },
        },
        autoLogging: false,
      },
    }),
    MongodbModule.forRoot(MONGODB__URI, {
      dbName: MONGODB__DATABASE,
    }),
    RedisCacheModule.forRoot({
      host: KEYV__REDIS__HOST,
      port: Number(KEYV__REDIS__PORT),
      username: KEYV__REDIS__USERNAME,
      password: KEYV__REDIS__PASSWORD,
    }),
    RedisClientModule.forRoot({
      host: REDIS__CLIENT__HOST,
      port: Number(REDIS__CLIENT__PORT),
      username: REDIS__CLIENT__USERNAME,
      password: REDIS__CLIENT__PASSWORD,
    }),
    BinanceSubModule,
    AuthModule,
    UserModule,
    SystemModule,
    WalletModule,
    BuyModule,
    HealthModule,
    ResourceModule,
  ],
})
export class AppModule {}
