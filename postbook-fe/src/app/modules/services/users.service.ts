import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EXTERNAL } from '../users/components/constants/users.routes';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post';
import { UserStoreState } from '../stores/users/users.reducers';
import { Store } from '@ngrx/store';
import { UserLoginAction } from '../stores/users/users.store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private store: Store<{ activeUser: UserStoreState }>) { }

  public register(createUserDto: CreateUserDto) {
    const url = `${EXTERNAL.USERS.BASE_URL}/${EXTERNAL.USERS.POST_REGISTER}`;
    return this.httpClient.post(url, createUserDto, { observe: 'response' });
  }

  public login(loginUserDto: LoginUserDto) {
    const url = `${EXTERNAL.USERS.BASE_URL}/${EXTERNAL.USERS.POST_LOGIN}`;
    return this.httpClient.post(url, loginUserDto, { observe: 'response' }).pipe(map(d => {
      if (d.status === 200) {
        const user = d.body as User;
        this.store.dispatch(new UserLoginAction(user));
      }
      return d;
    }));
  }

  public getActiveUser() {
    return this.store.select('activeUser');
  }

  public findOne(id: string) {
    const url = `${EXTERNAL.USERS.BASE_URL}/${EXTERNAL.USERS.GET_USERS_DETAILS.replace(":id", id)}`;
    return this.httpClient.get<User>(url);
  }

  public findTimeline(id: string) {
    const url = `${EXTERNAL.USERS.BASE_URL}/${EXTERNAL.USERS.GET_USERS_TIMELINE.replace(":id", id)}`;
    return this.httpClient.get<Post[]>(url);
  }

}
