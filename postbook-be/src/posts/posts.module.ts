import { Module } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
