import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Request as ExpressRequest } from 'express';
import { log } from 'console';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(@Request() req: ExpressRequest) {
    log(req.userObject);
    return this.userService.getUsers();
  }
}
