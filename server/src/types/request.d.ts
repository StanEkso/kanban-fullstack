import { User as UserEntity } from 'src/user/user.entity';

export {};
declare global {
  namespace Express {
    export interface Request {
      user?: Omit<UserEntity, 'password'> | null;
    }
  }
}
