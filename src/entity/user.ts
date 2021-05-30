import { IsDate, IsEmail, IsString } from "class-validator"


export class User {
  _id?: string

  @IsString()
  firstName?: string

  @IsString()
  lastName?: string

  @IsEmail()
  email: string

  password: string

  @IsDate()
  createdAt: Date

  constructor({ email, firstName, lastName }: { email?: string, firstName?: string, lastName?: string }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName
  }

}

export default User

