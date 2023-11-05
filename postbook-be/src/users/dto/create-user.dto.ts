import { UserTypeEnum } from "../entities/user.type.enum";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    type: UserTypeEnum;
}
