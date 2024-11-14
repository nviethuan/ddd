import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UseInterceptors,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateWalletDto } from '../domain/dto/create-wallet.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@common/infrastructure/guards/api-key/api-key.guard';
import { Auth0Guard } from '@common/infrastructure/guards/auth0/auth0.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GroupInterceptor } from '@common/infrastructure/interceptors/group/group.interceptor';
import { AuthRequest } from '@common/types/app-request';
import { UpdateWalletDto } from '../domain/dto/update-wallet.dto';
import { CreateWallet } from '../application/ports/create-wallet';
import { GetAllWallets } from '../application/ports/get-all-wallets';
import { ById } from '../application/ports/get-wallet-by-id';
import { UpdateWallet } from '../application/ports/update-wallet';
import { DeleteWalletById } from '../application/ports/delete-wallet-by-id';

@Controller('wallets')
@ApiTags('Wallet')
@ApiSecurity('api_key')
@ApiBearerAuth()
@UseGuards(ApiKeyGuard)
@UseGuards(Auth0Guard)
export class WalletController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a wallet' })
  @ApiBody({
    type: CreateWalletDto,
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(GroupInterceptor)
  create(@Body() createWalletDto: CreateWalletDto, @Req() req: AuthRequest) {
    return this.commandBus.execute(new CreateWallet(createWalletDto, req.user));
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallets' })
  findAll(@Req() req: AuthRequest) {
    return this.queryBus.execute(new GetAllWallets(req.user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wallet by id' })
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.queryBus.execute(new ById(id, req.user));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a wallet' })
  @ApiBody({
    type: UpdateWalletDto,
  })
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto, @Req() req: AuthRequest) {
    return this.commandBus.execute(new UpdateWallet(id, req.user, updateWalletDto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wallet' })
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.commandBus.execute(new DeleteWalletById(id, req.user));
  }
}
