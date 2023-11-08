import { Action } from "@ngrx/store";
import { User } from "../../entities/user.entity";
import { UserActions, UserLoginAction } from "./users.store";

export interface UserStoreState {
    activeUser: User | null;
}

export const initialUserState: UserStoreState = {
    activeUser: null
}

export function usersReducer(state = initialUserState, action: Action) {
    switch(action.type) {
        case UserActions.LoginUser: { 
            if (state.activeUser === null) {
                const newState = {
                    activeUser: (<UserLoginAction>action).user
                }
                return newState;
            } else {
                throw new Error("Already logged in");
            }
        }
        default: return initialUserState;
    }
}