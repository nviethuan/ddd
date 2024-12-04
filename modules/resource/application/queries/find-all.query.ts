import { ResourceService } from '@modules/resource/domain/services/resource.service';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class FindAllResourcesQuery implements IQuery {}

@QueryHandler(FindAllResourcesQuery)
export class FindAllResourcesQueryHandler implements IQueryHandler<FindAllResourcesQuery> {
  constructor(private readonly resourceService: ResourceService) {}

  async execute(query: FindAllResourcesQuery) {
    return this.resourceService.findAll();
  }
}
