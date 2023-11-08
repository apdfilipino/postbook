import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateFriendsDto } from '../users/dto/create-friends.dto';
import { UserTypeEnum } from '../users/entities/user.type.enum';
import { LoginUserDto } from '../users/dto/login-user.dto';

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
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        userId: true
      }
    })
    return user;
  }

  public async findTimeline(id: number) {
    const { timeline } = await this.prismaService.users.findFirst({
      where: {
        userId: id
      },
      select: {
        timeline: {
          select: {
            postId: true,
            parentId: true,
            text: true,
            poster: {
              select: {
                userId: true,
                email: true,
                firstName: true,
                lastName: true
              }
            },
            children: {
              select: {
                postId: true,
                parentId: true,
                text: true,
                poster: {
                  select: {
                    userId: true,
                    email: true,
                    firstName: true,
                    lastName: true
                  }
                }
              }
            }
          }
        }
      }
    })
    return timeline;
  }
}
