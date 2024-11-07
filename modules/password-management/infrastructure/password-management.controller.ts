import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasswordManagementService } from '../application/services/password-management.service';
import { CreatePasswordManagementDto } from '../domain/dto/create-password-management.dto';
import { UpdatePasswordManagementDto } from '../domain/dto/update-password-management.dto';

@Controller('password-management')
export class PasswordManagementController {
  constructor(private readonly passwordManagementService: PasswordManagementService) {}

  @Post()
  create(@Body() createPasswordManagementDto: CreatePasswordManagementDto) {
    return this.passwordManagementService.create(createPasswordManagementDto);
  }

  @Get()
  findAll() {
    return this.passwordManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordManagementDto: UpdatePasswordManagementDto) {
    return this.passwordManagementService.update(+id, updatePasswordManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordManagementService.remove(+id);
  }
}
