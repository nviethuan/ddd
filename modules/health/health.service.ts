import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import * as si from 'systeminformation';

@Injectable()
export class HealthService {
  private $ramStats;

  onConnection(client: Socket) {
    this.ramStats(client);
  }

  onDisconnect(client: Socket) {
    if (this.$ramStats) {
      clearInterval(this.$ramStats);
    }
  }

  ramStats(client: Socket) {
    if (!this.$ramStats) {
      this.$ramStats = setInterval(async () => {
        const [networkInterfaces, networkConnections, networkStats, memory] = await Promise.all([
          si.networkInterfaces(),
          si.networkConnections(),
          si.networkStats(),
          si.mem(),
        ]);

        client.emit('ram_stats', JSON.stringify({ networkInterfaces, networkConnections, networkStats, memory }));
      }, 1000);
    }
  }
}
