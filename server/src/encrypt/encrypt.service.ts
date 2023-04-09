import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 5);
  }
  async isPasswordsEquals(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
