import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { EncryptModule } from '../encrypt/encrypt.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    EncryptModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.getOrThrow<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
