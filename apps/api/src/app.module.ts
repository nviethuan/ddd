import { MongodbModule } from '@libs/mongodb';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { MONGODB__DATABASE, MONGODB__URI } from 'common/src/configs/envs';
import { UserModule } from '@modules/user/user.module';
import { WalletModule } from '@modules/wallet/wallet.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
    MongodbModule.forRoot(MONGODB__URI, {
      dbName: MONGODB__DATABASE,
    }),
    // AuthModule,
    UserModule,
    WalletModule,
  ],
})
export class AppModule {}
