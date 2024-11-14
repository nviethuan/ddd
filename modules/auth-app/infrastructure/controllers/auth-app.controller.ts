import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAuthAppDto } from '@modules/auth-app/domain/dtos/create-auth-app.dto';
import { UpdateAuthAppDto } from '@modules/auth-app/domain/dtos/update-auth-app.dto';
import { AuthAppService } from 'modules/auth-app/application/services/auth-app.service';

@Controller('auth-app')
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Post()
  create(@Body() createAuthAppDto: CreateAuthAppDto) {
    return this.authAppService.create(createAuthAppDto);
  }

  @Get()
  findAll() {
    return this.authAppService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authAppService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthAppDto: UpdateAuthAppDto) {
    return this.authAppService.update(+id, updateAuthAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authAppService.remove(+id);
  }
}
