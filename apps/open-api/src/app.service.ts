import { Inject, Injectable } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { generateOpenApi } from '@utils/openApiGenerator';
import { OpenApiModule } from './open-api.module';

@Injectable()
export class AppService {
  async getDocs() {
    const app = await NestFactory.create(OpenApiModule);

    return generateOpenApi(app);
  }
}
