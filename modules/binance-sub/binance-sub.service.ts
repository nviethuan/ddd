import { User } from '@modules/user/domain/entities/user.entity';
import { Wallet } from '@modules/wallet/domain/entities/wallet.entity';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { appendFileSync } from 'fs';
import { Model, Mongoose } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { EOL } from 'os';
import WebSocket from 'ws';
import { BINANCE_NETWORKS } from '@common/configs/binance-network';
import { BINANCE__NETWORK } from '@common/configs/envs';

interface StreamPayload {
  stream: string;
  data: any;
}

@Injectable()
export class BinanceSubService implements OnApplicationBootstrap {
  private processes = new Map<string, boolean>();
  private wallets = new Map<string, Map<string, Wallet>>();
  private baseWsUrl = BINANCE_NETWORKS[BINANCE__NETWORK].socketStream[0];
  private clients = new Map<string, WebSocket>();

  constructor(
    private readonly logger: PinoLogger,
    @Inject(Wallet)
    private readonly walletModel: Model<Wallet>,
    @Inject(Mongoose)
    private readonly connection: Mongoose,
  ) {
    this.logger.setContext(BinanceSubService.name);
  }

  async onApplicationBootstrap() {
    // this.run();
  }

  getStatus(user: User) {
    const processId = this.buildProcessId('main', user);
    const isRunning = this.processes.has(processId);

    return {
      isRunning,
      ram: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
    };
  }

  async start(user: User) {
    const processId = this.buildProcessId('main', user);
    const isRunning = this.processes.get(processId);

    if (!isRunning) {
      const wallets = await this.walletModel.find({ owner: user._id });

      this.wallets.set(user._id.toString(), new Map(wallets.map((wallet) => [wallet.symbol, wallet])));

      const streamCombinedUrl = this.buildStreamUrls(wallets);
      this.clients.set(`main-${user._id.toString()}`, new WebSocket(streamCombinedUrl));

      this.run(user);

      this.processes.set(processId, true);
    }

    return {
      isRunning: !isRunning,
    };
  }

  stop(user: User) {
    const processId = this.buildProcessId('main', user);
    const isRunning = this.processes.get(processId);

    if (isRunning) {
      this.clients.forEach((client) => {
        client.close();
      });

      this.processes.set(processId, false);
    }

    return {
      isRunning: !isRunning,
    };
  }

  private run(user: User) {
    this.logger.info(`Running ${this.clients.size} clients...`);
    this.clients.forEach((client) => {
      client.onmessage = (event: WebSocket.MessageEvent) => {
        const payload: StreamPayload = JSON.parse(event.data as string);

        this.handleStreamPayload(user, payload);
      };

      client.on('ping', (data) => {
        client.pong(data);
      });
    });
  }

  private async handleStreamPayload(user: User, payload: StreamPayload) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const [symbol, eventName] = payload.stream.split('@');
      const userWallets = this.wallets.get(user._id.toString());
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  private buildStreamUrls(wallets: Wallet[]) {
    return `${this.baseWsUrl}/stream?streams=${wallets.map((wallet) => {
      return [
        this.buildKlineStreamName(`${wallet.symbolBase}${wallet.symbolQuote}`, '1m'),
        this.buildAggTradeStreamName(`${wallet.symbolBase}${wallet.symbolQuote}`),
        this.buildAvgPriceStreamName(`${wallet.symbolBase}${wallet.symbolQuote}`),
      ].join('/');
    })}`;
  }

  private buildKlineStreamName(symbol: string, interval: string) {
    return `${symbol.toLowerCase()}@kline_${interval}`;
  }

  private buildAggTradeStreamName(symbol: string) {
    return `${symbol.toLowerCase()}@aggTrade`;
  }

  private buildAvgPriceStreamName(symbol: string) {
    return `${symbol.toLowerCase()}@avgPrice`;
  }

  private buildProcessId(context: string, user: User) {
    return `${context}-${user._id.toString()}`;
  }
}
