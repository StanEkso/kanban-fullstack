import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { BoardModule } from 'src/board/board.module';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => BoardModule)],
  controllers: [UserController],
})
export class UserModule {}
