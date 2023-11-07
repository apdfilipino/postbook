import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users.details.component.html',
  styleUrls: ['./users.details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    userId: 0
  };
  id: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id") ?? "";
    this.usersService.findOne(this.id).subscribe(d => {
      console.log(d);
      this.user = d;
    })
  }

}
