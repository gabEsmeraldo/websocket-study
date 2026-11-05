import { Injectable } from '@nestjs/common';
import {
  getStoragePath,
  resolveStorageFilePath,
} from '../../../../shared/storage/storage.utils.js';
import * as fs from 'node:fs';

const FILE_PATH = resolveStorageFilePath('data.csv');

@Injectable()
export class SaveMessageRepository {
  async saveMessage(msg: string): Promise<void> {
    const string = await this.findAll();
    let text = string.concat(`${msg}\n`)
    await fs.promises.writeFile(FILE_PATH, text);
  }

  async checkMessageExists(msg: string): Promise<boolean> {
    let array = await this.findAll();
    let messages = array.split('\n').map((string) => string.trim())
    return messages.find((string) => string.toUpperCase() === msg.toUpperCase()) !== undefined
  }

  private async findAll(): Promise<string> {
    try {
      await fs.promises.access(getStoragePath());
    } catch {
      await fs.promises.mkdir(getStoragePath(), { recursive: true });
    }
    return await fs.promises.readFile(FILE_PATH, 'utf8');
  }
}
