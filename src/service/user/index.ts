import { UserRepository } from "@repository/user/";
import { User } from "@entity/user"
import { Service } from "typedi";

@Service()
export class UserService {

  constructor(private readonly userRepo: UserRepository) { }

  async create(user: User): Promise<Boolean> {
    return await this.userRepo.create(user);
  }

  async find() {
    return await this.userRepo.find()
  }


  async findByEmail(email: string) {
    return await this.userRepo.findByEmail(email)
  }

  async delete() {
    return await this.userRepo.remove()
  }

}