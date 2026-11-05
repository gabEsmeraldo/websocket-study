import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module.js';
import { MessageModule } from '../message/message.module.js';

@Module({
  imports: [WebsocketModule, MessageModule],
  exports: [WebsocketModule],
})
export class SharedModule {}
