import { BINANCE__WS_URL } from '@common/configs/envs';
import { Injectable } from '@nestjs/common';
import { appendFileSync } from 'fs';
import { Logger } from 'nestjs-pino';
import { EOL } from 'os';
import WebSocket from 'ws';

@Injectable()
export class BinanceSubService {
  private readonly ws = new WebSocket(`${BINANCE__WS_URL}/ws/btcusdt@kline_1s`);
  private readonly wsCombined = new WebSocket(`${BINANCE__WS_URL}/stream?streams=solusdt@kline_1s`);
  constructor(private readonly logger: Logger) {
    this.onBTCUSDTKline1s();
    this.onCombinedKline1s();
  }

  async onBTCUSDTKline1s() {
    this.ws.onmessage = (data) => {
      appendFileSync('./btcusdt_kline_1m.txt', data.data + EOL);
    };
  }

  async onCombinedKline1s() {
    this.wsCombined.onmessage = (data) => {
      appendFileSync('./btcusdt_combined_kline_1s.txt', data.data + EOL);
    };
  }
}
