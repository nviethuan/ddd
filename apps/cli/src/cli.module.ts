import { Logger, Module } from '@nestjs/common';
import { Cli } from './cli.controller';
import { CliService } from './cli.service';

@Module({
  imports: [],
  controllers: [],
  providers: [Cli, Logger, CliService],
})
export class CliModule {}
