import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/modules/entities/user.entity';
import { UsersService } from 'src/app/modules/services/users.service';
import { CreatePostDto } from '../../dto/create-post.dto';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/modules/services/posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts.create.component.html',
  styleUrls: ['./posts.create.component.scss']
})
export class PostsCreateComponent {

  constructor(private usersService: UsersService, private route: ActivatedRoute, private postsService: PostsService) {}

  @Output() onSuccessReply = new EventEmitter<boolean>();
  @Input() parentId: number | null = null;

  data: CreatePostDto = {
    userId: 0,
    parentId: null,
    text: '',
    posterId: 0
  }

  reply() {
    this.usersService.getActiveUser().subscribe(d => {
      const activeUser = d.activeUser;
      this.data.posterId = activeUser!.userId;
      this.data.parentId = this.parentId
      this.data.userId = +this.route.snapshot.paramMap.get("id")!;
      console.log({
        ...this.data
      })
      this.postsService.createPost(this.data).subscribe(d => {
        if (d.status === 201) {
          this.onSuccessReply.emit(true);
        }
      });
    });
  }
}
