import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateFriendsDto } from './dto/create-friends.dto';
import { UserTypeEnum } from './entities/user.type.enum';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  
  constructor(private prismaService: PrismaService){}

  public async create({ firstName, lastName, email, username, password }: CreateUserDto) {
    const newUser: Prisma.UsersCreateArgs = {
      data: {
        firstName,
        lastName,
        email,
        username,
        password,
        type: UserTypeEnum.User
      },
      select: {
        userId: true
      }
    };
    const { userId } = await this.prismaService.users.create(newUser);
    return { firstName, lastName, email, userId };
  }

  public async findAll() {
    return this.prismaService.users.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        username: true
      }
    });
  }

  public async findOne(id: number) {
    const user = await this.prismaService.users.findFirst({
      where: {
        userId: id
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        username: true
      }
    })
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public async remove(id: number) {
    return this.prismaService.users.delete({
      where: {
        userId: id
      }
    });
  }

  public async findFriends(id: number) {
    const friends = await this.prismaService.relations.findMany({
      where: { userId: id },
      include: {
        friend: true
      }
    });
    return friends;
  }

  public async createFriends({ userId, friendId }: CreateFriendsDto) {
    const [ { relationId } ] = await Promise.all([
      this.prismaService.relations.create({
        data: {
          userId,
          friendId
        },
        select: {
          relationId: true
        }
      }),
      this.prismaService.relations.create({
        data: {
          friendId: userId,
          userId: friendId
        }
      }),
    ])
    return { userId, friendId, relationId };
  }

  public async findByUsernamePassword(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.users.findFirst({
      where: {
        AND: {
          username: loginUserDto.username,
          password: loginUserDto.password
        }
      },
      select: {
        userId: true
      }
    })
    return user;
  }
}
