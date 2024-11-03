import { BUFFER_ENCODING } from '@common/constants/buffer-encoding';
import { generateKeyPairSync } from 'crypto';
import { writeFile, writeFileSync } from 'fs';
import { Command, CommandRunner, Option } from 'nest-commander';
import { PinoLogger } from 'nestjs-pino';
import { resolve } from 'path';

interface KeyGeneratorOptions {
  out: string;
}

@Command({
  name: 'key',
  description: 'Generate rsa key files',
})
export class KeyGeneratorCmd extends CommandRunner {
  constructor(private readonly logger: PinoLogger) {
    super();
    this.logger.setContext(KeyGeneratorCmd.name);
  }

  async run(_passedParam: string[], options?: KeyGeneratorOptions): Promise<void> {
    const out = resolve(process.cwd(), options?.out || '.');

    this.logger.info('Output directory:', out);

    const keyPair = generateKeyPairSync('rsa', {
      modulusLength: 1024 * 4, // bits - standard for RSA keys
      publicKeyEncoding: {
        type: 'pkcs1', // "Public Key Cryptography Standards 1"
        format: 'pem', // Most common formatting choice
      },
      privateKeyEncoding: {
        type: 'pkcs1', // "Public Key Cryptography Standards 1"
        format: 'pem', // Most common formatting choice
      },
    });

    writeFileSync(`${out}/key.pem`, keyPair.privateKey);
    writeFileSync(`${out}/key.pub`, keyPair.publicKey);

    await Promise.all([
      new Promise((r) => {
        writeFile(`${out}/key.pem`, keyPair.privateKey, r);
      }),
      new Promise((r) => {
        writeFile(`${out}/key.pub`, keyPair.publicKey, r);
      }),
    ]);

    this.logger.info(`JWT__PRIVATE_KEY=${Buffer.from(keyPair.privateKey).toString(BUFFER_ENCODING)}`);
    this.logger.info(`JWT__PUBLIC_KEY=${Buffer.from(keyPair.publicKey).toString(BUFFER_ENCODING)}`);

    process.exit(0);
  }

  @Option({
    flags: '-o, --out [out]',
    description: 'Output file',
  })
  parseOut(value: string): string {
    this.logger.info('parseOut', value);
    return value;
  }
}
