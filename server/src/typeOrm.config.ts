import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { ColumnEntity } from './column/column.entity';
import { Board } from './board/board.entity';
import { Task } from './task/task.entity';
import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path: resolve(process.cwd(), 'env', 'development.env'),
  debug: true,
  override: true,
});
const configService = new ConfigService();
console.log(__dirname);
export default new DataSource({
  type: 'postgres',
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  url: configService.get('DATABASE_URL'),
  entities: [User, ColumnEntity, Board, Task],
  migrations: [__dirname + '/migrations/*.ts'],
});
