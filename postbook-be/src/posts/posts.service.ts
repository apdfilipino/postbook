import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from "@prisma/client";

@Injectable()
export class PostsService {

  constructor(private prismaService: PrismaService){}

  public async create({ userId, parentId, text }: CreatePostDto) {
    const newPost: Prisma.PostsCreateArgs = {
      data: {
        userId: userId,
        text: text,
        parentId: parentId
      },
      select: {
        postId: true
      }
    }
    const { postId } = await this.prismaService.posts.create(newPost);
    return { userId, parentId, text, postId };
  }

  findAll() {
    return `This action returns all posts`;
  }

  public async findOne(id: number) {
    const post = await this.prismaService.posts.findFirst({
      where: {
        postId: id
      },
      include: {
        children: true
      }
    })
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  public async remove(id: number) {
    return await this.prismaService.posts.delete({
      where: { postId: id }
    })
  }
}
