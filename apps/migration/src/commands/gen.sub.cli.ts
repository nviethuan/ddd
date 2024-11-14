import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { Logger } from 'nestjs-pino';
import { resolve } from 'path';
import { existsSync, writeFileSync, appendFileSync } from 'fs';
import { EOL } from 'os';
import { camelCase, upperFirst } from 'lodash';

const classTemplate = (className: string, migrationName: string) => `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${className} {
  public migrationName = '${migrationName}';

  constructor() {}

  async up() {}

  async down() {}
}${EOL}`;

@SubCommand({ name: 'create', aliases: ['c', 'gen', 'g'], description: 'Create a new group' })
export class GenCmd extends CommandRunner {
  constructor(private readonly logService: Logger) {
    super();
  }

  async run(passedParam: string[], options: any): Promise<void> {
    const date = Date.now();
    const name = options.name;

    const className = `${upperFirst(camelCase(name))}_${date}`;
    const migrationName = `${date}_${name}`;

    const basePath = resolve(process.cwd(), 'apps/migration/src/migrations');
    const filePath = resolve(basePath, `${migrationName}.ts`);
    const indexFilePath = resolve(basePath, 'index.ts');

    if (existsSync(filePath)) {
      this.logService.error(`Migration file ${filePath} already exists`);
      return;
    }

    writeFileSync(filePath, classTemplate(className, migrationName), 'utf-8');
    appendFileSync(indexFilePath, `export * from './${migrationName}';${EOL}`, 'utf-8');
    this.logService.log(`Migration file ${filePath} created`);
  }

  @Option({ flags: '-n, --name <name>', description: 'Migration name' })
  parseName(val: string) {
    return val;
  }
}
