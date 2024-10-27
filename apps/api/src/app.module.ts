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
} from 'common/src/configs/envs';
import { UserModule } from '@modules/user/user.module';
import { WalletModule } from '@modules/wallet/wallet.module';
import { RedisCacheModule } from '@app/redis-cache';
import { AuthModule } from '@modules/auth/auth.module';

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
      port: KEYV__REDIS__PORT,
      username: KEYV__REDIS__USERNAME,
      password: KEYV__REDIS__PASSWORD,
    }),
    AuthModule,
    UserModule,
    WalletModule,
  ],
})
export class AppModule {}
