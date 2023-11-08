import { Action } from "@ngrx/store";
import { User } from "../../entities/user.entity";


export enum UserActions {
    LoginUser = "[User] LoginUser"
}

export class UserLoginAction implements Action {
    public type = UserActions.LoginUser;
    public user: User;
    constructor(user: User) {
        this.user = user;
    }
}