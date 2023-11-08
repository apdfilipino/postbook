import { Component } from '@angular/core';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { USERS } from '../constants/users.routes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-register',
  templateUrl: './users.register.component.html',
  styleUrls: ['./users.register.component.scss']
})
export class UsersRegisterComponent {

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar  
  ) {}

  data: CreateUserDto = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  }

  public async register() {
    const sub = this.usersService.register(this.data).subscribe(d => {
      if (d.status === 201) {
        sub.unsubscribe();
        this.snackBar.open("User has been created", "Close", { duration: 2000 })
        this.router.navigate([USERS.LOGIN_ROUTE]);
      }
    });
  }
}
