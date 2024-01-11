import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  @Post()
  async createUser(@Body() data: User) {
    return this.userService.createUser(data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
