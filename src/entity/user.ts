import { IsDate, IsEmail, IsString } from "class-validator";

export class User {
  _id?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsEmail()
  email: string;

  password: string;

  @IsDate()
  createdAt: Date;

  roles: string[];
}

export default User;
