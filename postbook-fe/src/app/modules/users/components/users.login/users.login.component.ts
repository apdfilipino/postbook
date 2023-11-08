import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../constants/users.routes';
import { UsersService } from '../../../services/users.service';
import { LoginUserDto } from '../../dto/login-user.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/modules/entities/user.entity';

@Component({
  selector: 'app-users-login',
  templateUrl: './users.login.component.html',
  styleUrls: ['./users.login.component.scss']
})
export class UsersLoginComponent implements OnInit {

  activeUser: User | null = null;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.usersService.getActiveUser().subscribe(u => {
      if (!!u.activeUser) {
        this.activeUser = u.activeUser;
        this.router.navigate([ USERS.DETAILS_ROUTE.replace(":id", `${this.activeUser.userId}`) ]);
      }
    });
  }

  loginData: LoginUserDto = {
    username: '',
    password: ''
  }

  public login() {
    const sub = this.usersService.login(this.loginData).subscribe(d => {
      if (d.status === 200) {
        sub.unsubscribe();
        const { userId: id } = d.body as { userId : number };
        this.snackBar.open("Login successful!", "Close", { duration: 2000 })
        this.router.navigate([ USERS.DETAILS_ROUTE.replace(":id", `${id}`) ]);
      }
    });
  }
  
  public register() {
    this.router.navigate([ USERS.REGISTER_ROUTE ]);
  }
}
