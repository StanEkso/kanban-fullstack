import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { EncryptModule } from 'src/encrypt/encrypt.module';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [UserModule, EncryptModule],
  providers: [AuthService],
})
export class AuthModule {}
