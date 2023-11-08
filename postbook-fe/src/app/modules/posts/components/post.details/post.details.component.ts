import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../entities/post';
import { PostsService } from '../../../services/posts.service';
import { User } from 'src/app/modules/entities/user.entity';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-details',
  templateUrl: './post.details.component.html',
  styleUrls: ['./post.details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  showReplies: boolean = false;
  createReply: boolean = false;

  @Input() post: Post = {
    postId: -1,
    parentId: null,
    text: '',
    poster: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      userId: -1
    },
    children: undefined
  }

  constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.post.children === undefined && this.post.postId !== -1) {
      this.getChildren();
    }
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
    this.createReply = false;
  }

  toggleCreateReply() {
    this.showReplies = false;
    this.createReply = !this.createReply;
  }

  onSuccessReply(success: boolean) {
    console.log(success);
    if (success) {
      this.showReplies = false;
      this.router.navigate([this.route.snapshot.routeConfig]);
    }
  }
  
  get hasReplies() {
    return this.post.children !== undefined && this.post.children.length > 0;
  }

  getChildren() {
    const postsSub = this.postsService.findOne(`${this.post.postId}`).subscribe(p => {
      this.post.children = p.children;
      postsSub.unsubscribe();
    });
  }
}
