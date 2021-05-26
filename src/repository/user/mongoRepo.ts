import { mongo } from "@src/dataAccess/mongodb";
import mongodb from "mongodb"
import User from "@src/entity/user";
import { IUserRepository } from "./index"
import { Service } from "typedi";

@Service()
export class MongoRepo implements IUserRepository {

  private model: mongodb.Collection;
  private connection: mongodb.MongoClient;


  async init() {
    let mongoClient = await mongo.getInstance().connect()
    this.connection = mongoClient;
    this.model = mongoClient.db().collection("user")
  }

  async create(user: Omit<User, "_id">) {
    await this.model.insertOne(user)
    return true
  }

  async find() {
    return await this.model.find({}).toArray()
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email })
  }


  async remove() {
    return await this.model.deleteMany({})
  }

  async close(): Promise<void> {
    return await this.connection.close()
  }

}