import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFriendsDto } from './dto/create-friends.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':id/friends')
  findFriends(@Param('id') id: string) {
    return this.usersService.findFriends(+id);
  }

  @Post('friends')
  public async createFriends(@Body() createFriendsDto: CreateFriendsDto) {
    return this.usersService.createFriends(createFriendsDto);
  }

  @Post('login')
  @HttpCode(200)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const res = await this.usersService.findByUsernamePassword(loginUserDto);
    if (!res) {
      throw new NotFoundException("User not found");
    }
    return { userId: res.userId };
  }
}
