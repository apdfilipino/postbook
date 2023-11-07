import { UserTypeEnum } from "./user.type.enum";

export class User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    type: UserTypeEnum;
}
