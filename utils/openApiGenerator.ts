import { INestApplication } from '@nestjs/common';
import { setupSwagger } from './setupSwagger';
import { writeFileSync } from 'fs';

export function generateOpenApi(app: INestApplication<any>, fileName?: string) {
  const document = setupSwagger({ app });

  if (fileName) {
    writeFileSync(fileName, JSON.stringify(document, null, 2));
  }

  return document;
}
