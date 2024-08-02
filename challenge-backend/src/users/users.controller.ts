import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param() params: any): Promise<User> {
    return this.usersService.findByEmail(params.email);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() user: User) {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    return this.usersService.create(user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param() params: any): Promise<string> {
    return this.usersService.delete(parseInt(params.id));
  }
}
