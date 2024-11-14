import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserGroupDto } from '@modules/user-group/domain/dtos/create-user-group.dto';
import { UpdateUserGroupDto } from '@modules/user-group/domain/dtos/update-user-group.dto';
import { UserGroupService } from 'modules/user-group/application/services/user-group.service';

@Controller('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Post()
  create(@Body() createUserGroupDto: CreateUserGroupDto) {
    return this.userGroupService.create(createUserGroupDto);
  }

  @Get()
  findAll() {
    return this.userGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserGroupDto: UpdateUserGroupDto) {
    return this.userGroupService.update(+id, updateUserGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGroupService.remove(+id);
  }
}
