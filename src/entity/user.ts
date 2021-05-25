import { IsDate, IsEmail } from "class-validator"


export class User {
  _id: string
  fistName: string
  lastName: string

  @IsEmail()
  email: string
  password: string

  @IsDate()
  createdAt: Date

  constructor({ email }: { email: string }) {
    this.email = email
  }

}

export default User

