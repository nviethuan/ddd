import { Logger, Module } from '@nestjs/common';
import { UserCmd } from './infrastructure/commands/user/user.cmd';
import { UserCliService } from './application/services/user/user.service';
import { GroupCmd } from './infrastructure/commands/group/group.cmd';
import { GroupCliService } from './application/services/group/group.service';
import { GroupModule } from 'modules/group/group.module';
import { CreateGroupCmd } from './infrastructure/commands/group/create-group.cmd';
import { DeleteGroupCmd } from './infrastructure/commands/group/delete-group.cmd';
import { CreateUserCmd } from './infrastructure/commands/user/create-user.cmd';
import { DeleteUserCmd } from './infrastructure/commands/user/delete-user.cmd';
import { CreateUserQuestions } from './infrastructure/commands/user/create-user.ques';
import { UserModule } from 'modules/user/user.module';
import { ForceChangePasswordQuestions } from './infrastructure/commands/user/force-change-password.ques';
import { ForceChangePasswordCmd } from './infrastructure/commands/user/force-change-password.cmd';
import { UserGroupModule } from 'modules/user-group/user-group.module';
import { MongodbModule } from '@libs/mongodb';
import { LoggerModule } from 'nestjs-pino';
import { KeyGeneratorCmd } from './infrastructure/commands/key-gen/key-generator.cmd';
import { RedisCacheModule } from '@app/redis-cache';
import {
  KEYV__REDIS__HOST,
  KEYV__REDIS__PASSWORD,
  KEYV__REDIS__PORT,
  KEYV__REDIS__USERNAME,
} from '@common/configs/envs';

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
    MongodbModule.forRoot(process.env.MONGODB__URI, {
      dbName: process.env.MONGODB__DATABASE,
    }),
    RedisCacheModule.forRoot({
      host: KEYV__REDIS__HOST,
      port: KEYV__REDIS__PORT,
      username: KEYV__REDIS__USERNAME,
      password: KEYV__REDIS__PASSWORD,
    }),
    GroupModule,
    UserModule,
    UserGroupModule,
  ],
  providers: [
    Logger,
    UserCliService,
    GroupCliService,

    GroupCmd,
    CreateGroupCmd,
    DeleteGroupCmd,

    UserCmd,
    CreateUserCmd,
    DeleteUserCmd,
    ForceChangePasswordCmd,

    CreateUserQuestions,
    ForceChangePasswordQuestions,

    KeyGeneratorCmd,
  ],
  controllers: [GroupCmd],
})
export class CliModule {}
