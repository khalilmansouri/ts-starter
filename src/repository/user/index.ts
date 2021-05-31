import { User } from "@entity/user";

export interface IUserRepository {
  create(user: Omit<User, "_id">): Promise<boolean>,
  find(): Promise<User[]>,
  findByEmail(id: string): Promise<User>,
  remove(): Promise<any>,

}

export { MongoRepo as UserRepository } from "@src/repository/user/mongoRepo";