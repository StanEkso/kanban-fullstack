import { User } from 'src/user/user.entity';

export {};
declare global {
  namespace Express {
    export interface Request {
      userObject?: User;
    }
  }
}
