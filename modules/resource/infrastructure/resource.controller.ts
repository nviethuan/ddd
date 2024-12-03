import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ResourceService } from '../application/services/resource.service';
import { CreateResourceDto } from '../domain/dto/create-resource.dto';
import { UpdateResourceDto } from '../domain/dto/update-resource.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindAllResourcesQuery } from '../application/queries/find-all.query';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Auth0Guard } from '@common/infrastructure/guards/auth0/auth0.guard';
import { ApiKeyGuard } from '@common/infrastructure/guards/api-key/api-key.guard';
import { CreateResourceCommand } from '../application/commands/create-resource.command';

@Controller('resource')
@ApiTags('Resources')
@ApiSecurity('api_key')
@ApiBearerAuth()
@UseGuards(ApiKeyGuard, Auth0Guard)
export class ResourceController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @ApiOperation({
    description: 'Create a new resource',
  })
  @ApiBody({
    type: CreateResourceDto,
  })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.commandBus.execute(new CreateResourceCommand(createResourceDto));
  }

  @Get()
  @ApiOperation({
    description: 'Find all resources',
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.queryBus.execute(new FindAllResourcesQuery());
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.resourceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
  //   return this.resourceService.update(+id, updateResourceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.resourceService.remove(+id);
  // }
}
