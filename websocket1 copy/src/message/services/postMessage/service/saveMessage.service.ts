import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SaveMessageRepository } from '../repository/saveMessage.repository.js';

@Injectable()
export class SaveMessageService {
  constructor(private readonly saveMessageRepository: SaveMessageRepository) {}

  async execute(msg: string): Promise<boolean> {
    try {
      if (!await this.saveMessageRepository.checkMessageExists(msg)) {
        this.saveMessageRepository.saveMessage(msg);
        console.log('mensagem adicionada')
        return true;
      }
      console.log('mensagem já existente')
      return false;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
