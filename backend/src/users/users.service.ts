import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getCurrentUser(req) {
    return { user: req.user };
  }
}
