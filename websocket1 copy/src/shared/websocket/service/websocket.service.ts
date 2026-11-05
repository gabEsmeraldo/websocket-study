import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SaveMessageService } from '../../../message/services/postMessage/service/saveMessage.service.js';

@WebSocketGateway()
export class WebSocketService {
  constructor(private readonly saveMessageService: SaveMessageService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('new_message')
  async handleNewMessage(@MessageBody() message: string) {
    if (message.length) {
      message = `websocket2:${message}`
        if (await this.saveMessageService.execute(message)) {
            console.log('mensage adicionada...', message);
        }
    }
  }
}
