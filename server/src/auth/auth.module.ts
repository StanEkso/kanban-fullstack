import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { EncryptModule } from 'src/encrypt/encrypt.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    EncryptModule,
    JwtModule.register({
      global: true,
      secret: 'SECRET KEY',
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
