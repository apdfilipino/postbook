import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EXTERNAL } from '../posts/constants/posts.routes';
import { Post } from '../entities/post';
import { CreatePostDto } from '../posts/dto/create-post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  public findOne(id: string) {
    const url = `${EXTERNAL.POSTS.BASE_URL}/${EXTERNAL.POSTS.GET_POSTS_DETAILS.replace(":id", id)}`;
    return this.httpClient.get<Post>(url);
  }
 
  public createPost(createPostDto: CreatePostDto) {
    const url = `${EXTERNAL.POSTS.BASE_URL}/${EXTERNAL.POSTS.POST_CREATE_POST}`;
    return this.httpClient.post(url, createPostDto, { observe: 'response' });
  }
}
