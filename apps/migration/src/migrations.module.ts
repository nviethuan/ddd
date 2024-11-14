import { Module } from '@nestjs/common';
import { MigrationCmd } from './commands/migration.cmd';
import { LoggerModule } from 'nestjs-pino';
import { GenCmd } from './commands/gen.sub.cli';
import { UpCmd } from './commands/up.sub';
import { UpMigrationsModule } from './up-migrations.module';

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
    UpMigrationsModule,
  ],
  controllers: [],
  providers: [MigrationCmd, GenCmd, UpCmd],
})
export class MigrationsModule {}
