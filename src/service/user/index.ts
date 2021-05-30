import { UserRepository } from "@repository/user/";
import { User } from "@entity/user"
import { Service } from "typedi";
import { HttpError } from "routing-controllers";
@Service()
export class UserService {

  constructor(private readonly userRepo: UserRepository) { }

  async create(user: User): Promise<Boolean> {
    return await this.userRepo.create(user);
  }

  async find() {
    return await this.userRepo.find()
  }

  // async login(email: string, password: string) {
  //   let user = await this.findByEmail(email)
  //   if (!user) return new HttpError(400, "User does'nt exist")
  //   if (user.password !== password) new HttpError(400, "Wrong password")
  //   else
  //     return user
  // }



  async findByEmail(email: string) {
    return await this.userRepo.findByEmail(email)
  }

  async delete() {
    return await this.userRepo.remove()
  }

}