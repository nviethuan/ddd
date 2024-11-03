import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';
import basicAuth from './basic-auth';
import packageJson from '../package.json';
import { readFileSync } from 'fs';

export interface SwaggerConfig {
  app: INestApplication<any>;
  title?: string;
  description?: string;
  version?: string;
  auth?: {
    user: string;
    password: string;
  };
}

export function setupSwagger(
  appType: 'express' | 'fastify',
  {
    app,
    title = process.env.APP__NAME,
    description = process.env.APP__DESCRIPTION,
    version = packageJson.version,
  }: SwaggerConfig,
) {
  let config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth({
      type: 'http',
      name: 'authorization',
    })
    .addApiKey({
      type: 'apiKey',
      in: 'header',
      name: 'X-API-TOKEN',
    });
  // .addBasicAuth({
  //   type: 'http',
  //   name: 'basic-authorization',
  // })
  // .addCookieAuth('session')
  // .addOAuth2({
  //   type: 'oauth2',
  //   flows: {
  //     authorizationCode: {
  //       authorizationUrl: 'https://example.com/auth',
  //       tokenUrl: 'https://example.com/token',
  //       scopes: {
  //         read: 'read',
  //         write: 'write',
  //       },
  //     },
  //   },
  // })
  // .addApiKey({
  //   type: 'apiKey',
  //   in: 'header',
  //   name: 'X-API-TOKEN',
  // })
  // .addSecurity('basic', {
  //   type: 'http',
  //   scheme: 'basic',
  // });

  `${process.env.APP__DOCS_SERVER_URLS || ''}`.split(',').forEach((server) => {
    const [name, url] = server.split('|');
    config = config.addServer(url, name);
  });

  app.use(
    '/api/docs',
    basicAuth[appType].basicAuth({
      user: process.env.DOCS_AUTH_USER || '',
      password: process.env.DOCS_AUTH_PASS || '',
    }),
  );
  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
    // jsonDocumentUrl: '/json',
    // yamlDocumentUrl: '/yaml',
    // explorer: true, // input for the swagger userSchema
    customCss: readFileSync('.swagger/dark.css', 'utf8'),
  });
}
