import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class HealthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly healthService: HealthService) {}

  handleConnection(client: Socket) {
    this.healthService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.healthService.onDisconnect(client);
  }

  // @SubscribeMessage('createHealth')
  // create(@MessageBody() createHealthDto: CreateHealthDto) {
  //   return this.healthService.create(createHealthDto);
  // }

  // @SubscribeMessage('findAllHealth')
  // findAll() {
  //   return this.healthService.findAll();
  // }

  // @SubscribeMessage('findOneHealth')
  // findOne(@MessageBody() id: number) {
  //   return this.healthService.findOne(id);
  // }

  // @SubscribeMessage('updateHealth')
  // update(@MessageBody() updateHealthDto: UpdateHealthDto) {
  //   return this.healthService.update(updateHealthDto.id, updateHealthDto);
  // }

  // @SubscribeMessage('removeHealth')
  // remove(@MessageBody() id: number) {
  //   return this.healthService.remove(id);
  // }
}
