import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../entities/user.entity';
import { UsersService } from '../../../services/users.service';
import { Post } from 'src/app/modules/entities/post';
import { USERS } from '../constants/users.routes';

@Component({
  selector: 'app-users-details',
  templateUrl: './users.details.component.html',
  styleUrls: ['./users.details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  activeUser: User | null = null;

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    userId: 0
  };
  id: string = "";

  timeline: Post[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getActiveUser().subscribe(u => {
      if (!u.activeUser) {
        this.router.navigate([ USERS.LOGIN_ROUTE ]);
      } else {
        this.activeUser = u.activeUser;
        this.id = this.route.snapshot.paramMap.get("id") ?? "";
        const userSub = this.usersService.findOne(this.id).subscribe(d => {
          this.user = d;
          userSub.unsubscribe();
          const timelineSub = this.usersService.findTimeline(this.id).subscribe(t => {
            this.timeline = t.filter(post => post.parentId === null);
            timelineSub.unsubscribe();
          })
        });
      }
    });
  }
}
