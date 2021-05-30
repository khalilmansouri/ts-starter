import { User } from "@entity/user";
import { Service } from "typedi";
import { UserService } from "@service/user";
import { singer } from "@http/middleware/jwt"
import { JsonController, Body, Get, Post, QueryParam, Param, Delete, Authorized, HttpError } from "routing-controllers";
import { IsEmail } from "class-validator";

@JsonController("/account")
@Service()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post("/login")
  async login(@Body() { email, password }: { email: string, password: string }) {//@Body() email: string, password: string

    let user: User = await this.userService.findByEmail(email)

    if (!user) throw new HttpError(400, "User doesn't exist")

    if (user.password !== password) return new HttpError(400, "Wrong password")
    else
      return singer({ email, roles: [] })
  }

  @Post("/signup")
  async signup(@Body() { email, password }: { email: string, password: string }) {

    let user: User = await this.userService.findByEmail(email)

    if (user) throw new HttpError(400, "Email already exists in our system")

    user = { email, password, createdAt: new Date() }

    await this.userService.create(user)

    return singer({ email, roles: [] })

  }


  @Delete("/")
  async deleteAll() {
    let ret = await this.userService.delete()
    return ret;
  }
}