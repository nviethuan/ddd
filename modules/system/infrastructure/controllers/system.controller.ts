import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req, UseGuards, Inject } from '@nestjs/common';
import { SystemService } from '../../application/services/system.service';
import { CreateSystemDto } from '../../domain/dto/create-system.dto';
import { UpdateSystemDto } from '../../domain/dto/update-system.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthRequest } from '@common/types/app-request';
import { Auth0Guard } from '@common/infrastructure/guards/auth0/auth0.guard';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

@Controller('system')
@ApiTags('System Controller')
export class SystemController {
  constructor(
    private readonly systemService: SystemService,
    @Inject('CALCULATE_SERVICE') private readonly client: ClientGrpc,
  ) {}

  @Get('binance/status')
  getBinanceSystemStatus() {
    return this.systemService.getBinanceSystemStatus();
  }

  // @Post('binance/status')
  // @HttpCode(200)
  // toggleBinanceSystemStatus() {
  //   return this.systemService.toggleBinanceSystemStatus();
  // }

  @Post('binance/start')
  @UseGuards(Auth0Guard)
  @ApiBearerAuth()
  @HttpCode(200)
  startBinanceSub(@Req() req: AuthRequest) {
    return this.systemService.startBinanceSub(req.user);
  }

  @Post('binance/stop')
  @UseGuards(Auth0Guard)
  @ApiBearerAuth()
  @HttpCode(200)
  stopBinanceSub(@Req() req: AuthRequest) {
    return this.systemService.stopBinanceSub(req.user);
  }

  @Get('grpc/hello')
  getHello() {
    const metadata = new Metadata();
    metadata.add('api-key', 'your-secure-api-key');

    const client = this.client.getService<any>('Calculate');
    return client.Calculate(
      {
        symbol: 'BTCUSDT',
        currentPrice: 10000,
        walletBaseBalance: 100,
        walletQuoteBalance: 100000,
        priceHistories: [],
        purchasePowers: [],
        sellPowers: [],
      },
      metadata,
    );
  }
}
