import { Module } from '@nestjs/common';
import { WebSocketService } from './service/websocket.service.js';
import { MessageModule } from '../../message/message.module.js';

@Module({
  imports: [MessageModule],
  providers: [WebSocketService],
  exports: [WebSocketService],
})
export class WebsocketModule {}
