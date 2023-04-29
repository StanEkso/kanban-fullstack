import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { EncryptService } from './encrypt/encrypt.service';
import { EncryptModule } from './encrypt/encrypt.module';
import { BoardModule } from './board/board.module';
import { Board } from './board/board.entity';
import { ColumnModule } from './column/column.module';
import { ColumnEntity } from './column/column.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_MODULE_CONFIG } from './config';

const isDevelopment = process.env.NODE_ENV !== 'production';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_MODULE_CONFIG),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.getOrThrow<string>('DATABASE_URL'),
        username: config.getOrThrow<string>('DATABASE_USERNAME'),
        password: config.getOrThrow<string>('DATABASE_PASSWORD'),
        entities: [Task, User, Board, ColumnEntity],
        port: 5432,
        synchronize: isDevelopment,
      }),
    }),
    AuthModule,
    EncryptModule,
    BoardModule,
    ColumnModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncryptService],
})
export class AppModule {}
