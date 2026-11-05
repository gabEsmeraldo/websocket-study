import { Module } from '@nestjs/common';
import { MessageServicesModule } from './services/messageServices.module.js';

@Module({
  imports: [MessageServicesModule],
  exports: [MessageServicesModule],
})
export class MessageModule {}
