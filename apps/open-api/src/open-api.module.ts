import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthControllerDocs } from 'modules/auth/infrastructure/controllers/auth.controller.docs';

@Module({
  imports: [CqrsModule],
  controllers: [AuthControllerDocs],
})
export class OpenApiModule {}
