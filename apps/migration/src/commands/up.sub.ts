import { ModuleRef } from '@nestjs/core';
import { CommandRunner, SubCommand } from 'nest-commander';
import { Logger } from 'nestjs-pino';
import * as migrations from '../migrations';
import { OnModuleInit } from '@nestjs/common';

@SubCommand({ name: 'up', aliases: ['u'], description: 'Up a migration' })
export class UpCmd extends CommandRunner implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly logger: Logger,
  ) {
    super();
  }

  async onModuleInit() {
    this.logger.log(this.moduleRef, 'migrations');
  }

  async run(passedParam: string[], options: any): Promise<void> {
    // const ms = Object.keys(migrations).map((migration) => this.moduleRef.get(migration));

    this.logger.log(this.moduleRef, 'migrations');
  }
}
