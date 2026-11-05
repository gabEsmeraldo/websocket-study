import { Module } from '@nestjs/common';
import { SaveMessageService } from './postMessage/service/saveMessage.service.js';
import { SaveMessageRepository } from './postMessage/repository/saveMessage.repository.js';

@Module({
  providers: [SaveMessageService, SaveMessageRepository],
  exports: [SaveMessageService],
})
export class MessageServicesModule {}
