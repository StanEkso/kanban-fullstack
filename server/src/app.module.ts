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
import { TokenGuard } from './auth/token.guard';
import { APP_GUARD } from '@nestjs/core';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'courseworkdb',
      entities: [User, Board, ColumnEntity, Task],
      synchronize: true,
    }),
    AuthModule,
    EncryptModule,
    BoardModule,
    ColumnModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EncryptService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {}
