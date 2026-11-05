import { BadRequestException } from '@nestjs/common';
import path from 'node:path';

export function getStoragePath() {
  return path.resolve(
    process.cwd(),
    process.env.FILE_SERVER_PATH || '../storage',
  );
}

export function resolveStorageFilePath(file_name: string) {
  const storage_path = getStoragePath();
  const file_path = path.resolve(storage_path, path.basename(file_name));

  if (path.dirname(file_path) !== storage_path) {
    throw new BadRequestException('Nome do arquivo inválido');
  }
  return file_path;
}
