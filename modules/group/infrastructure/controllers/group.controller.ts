import { Controller, Post, Body } from '@nestjs/common';
import { CreateGroupDto } from '../../domain/dtos/create-group.dto';
import { GroupService } from 'modules/group/application/services/group.service';
import { CommandBus } from '@nestjs/cqrs';
import { CreateGroup } from '@modules/group/application/ports/create-group';

@Controller('group')
export class GroupController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    const createGroup = new CreateGroup(createGroupDto);

    return this.commandBus.execute(createGroup);
  }

  // @Get()
  // findAll() {
  //   return this.groupService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupService.update(+id, updateGroupDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupService.remove(+id);
  // }
}
