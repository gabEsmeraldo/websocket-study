import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SharedModule } from './shared/shared.module.js';
import { MessageModule } from './message/message.module.js';

@Module({
  imports: [SharedModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
