import { User } from "@entity/user";

export interface IUserRepository {
  init(): void,
  create(user: Omit<User, "_id">): Promise<Boolean>,
  find(): Promise<User[]>,
  findByEmail(id: string): Promise<User>,
  remove(): Promise<any>,

}

export { MongoRepo as UserRepository } from "@src/repository/user/mongoRepo"