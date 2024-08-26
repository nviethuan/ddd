import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';
import { basicAuth } from './basicAuth';
import packageJson from '../package.json';

export function setupSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('The InviteOut API docs')
    .setDescription('The InviteOut API description')
    .setVersion(packageJson.version)
    .addBearerAuth({
      type: 'http',
      name: 'authorization',
    })
    .addBasicAuth({
      type: 'http',
      name: 'authorization',
    })
    .addServer('http://localhost:3000', 'Local')
    .addCookieAuth('session')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://example.com/auth',
          tokenUrl: 'https://example.com/token',
          scopes: {
            read: 'read',
            write: 'write',
          },
        },
      },
    })
    .addApiKey({
      type: 'apiKey',
      in: 'header',
      name: 'X-API-TOKEN',
    })
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();

  app.use(
    '/api/docs',
    basicAuth({
      user: process.env.DOCS_AUTH_USER || '',
      password: process.env.DOCS_AUTH_PASS || '',
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
    jsonDocumentUrl: '/json',
    yamlDocumentUrl: '/yaml',
    explorer: true, // input for the swagger ui
  });

  return document;
}
