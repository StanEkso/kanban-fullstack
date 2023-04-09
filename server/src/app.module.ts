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
      entities: [User, Board],
      synchronize: true,
    }),
    AuthModule,
    EncryptModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncryptService],
})
export class AppModule {}
