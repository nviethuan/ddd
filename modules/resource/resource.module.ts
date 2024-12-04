import { Module } from '@nestjs/common';
import { ResourceController } from './infrastructure/resource.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FindAllResourcesQueryHandler } from './application/queries/find-all.query';
import { CreateResourceCommandHandler } from './application/commands/create-resource.command';
import { ResourceService } from './domain/services/resource.service';

@Module({
  imports: [CqrsModule],
  controllers: [ResourceController],
  providers: [ResourceService, FindAllResourcesQueryHandler, CreateResourceCommandHandler],
})
export class ResourceModule {}
