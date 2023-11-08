import { Component, Input } from '@angular/core';
import { Post } from 'src/app/modules/entities/post';
import { User } from 'src/app/modules/entities/user.entity';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts.list.component.html',
  styleUrls: ['./posts.list.component.scss']
})
export class PostsListComponent {
  @Input() posts: Post[] = [];
}
