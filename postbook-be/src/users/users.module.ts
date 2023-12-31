import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
