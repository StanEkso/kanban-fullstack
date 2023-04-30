import { User as UserEntity } from '@/user/user.entity';

export {};
declare global {
  namespace Express {
    export interface Request {
      user?: Omit<UserEntity, 'password'> | null;
    }
  }
}
