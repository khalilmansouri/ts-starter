import { User } from "@entity/user";
import { Service } from "typedi";
import { UserService } from "@service/user";
import { cipher } from "@http/middleware/jwt"
import { JsonController, Body, Get, Post, QueryParam, Param, Delete, Authorized, HttpError } from "routing-controllers";
import { isEmail } from "class-validator";

@JsonController("/account")
@Service()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post("/login")
  async login(@Body() { email, password }: { email: string, password: string }) {//@Body() email: string, password: string

    if (!isEmail(email)) throw new HttpError(400, "Wrong email")

    let user: User = await this.userService.findByEmail(email)

    if (!user) throw new HttpError(400, "User doesn't exist")

    if (user.password !== password) throw new HttpError(400, "Wrong password")
    else
      return cipher({ email, roles: user.roles })
  }

  @Post("/signup")
  async signup(@Body() { email, password }: { email: string, password: string }) {

    let user: User = await this.userService.findByEmail(email)

    if (user) throw new HttpError(400, "Email already exists in our system")

    user = { email, password, createdAt: new Date(), roles: ["user"] }


    await this.userService.create(user)

    return cipher({ email, roles: ["user"] })
  }


  @Delete("/")
  async deleteAll() {
    let ret = await this.userService.delete()
    return ret;
  }
}