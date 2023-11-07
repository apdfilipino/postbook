import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CreateUserDto } from '../dto/create-user.dto';
import { EXTERNAL } from '../components/constants/users.routes';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public register(createUserDto: CreateUserDto) {
    const url = `${EXTERNAL.USERS.BASE_URL}/${EXTERNAL.USERS.POST_REGISTER}`;
    return this.httpClient.post(url, createUserDto, { observe: 'response' });
  }

  public login(loginUserDto: LoginUserDto) {
    const url = `${EXTERNAL.USERS.BASE_URL}/${EXTERNAL.USERS.POST_LOGIN}`;
    return this.httpClient.post(url, loginUserDto, { observe: 'response' });
  }

  public findOne(id: string) {
    const url = `${EXTERNAL.USERS.BASE_URL}/${EXTERNAL.USERS.GET_USERS_DETAILS.replace(":id", id)}`;
    return this.httpClient.get<User>(url);
  }

}
