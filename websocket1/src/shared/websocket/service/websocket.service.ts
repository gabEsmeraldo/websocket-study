import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SaveMessageService } from '../../../message/services/postMessage/service/saveMessage.service.js';

@WebSocketGateway()
export class WebSocketService {
  constructor(private readonly saveMessageService: SaveMessageService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('new_message')
  async handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() message: string) {
    console.log('mensagem recebida')
    if (message.length) {
      message = `${client.handshake.headers['x-client-id']}:${message}`
        if (await this.saveMessageService.execute(message)) {
            console.log('mensage adicionada...', message);
        }
    }
  }
}
