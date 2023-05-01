import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as SignedUser;
  },
);
export interface SignedUser {
  id: number;
  username: string;
  email: string;
}
