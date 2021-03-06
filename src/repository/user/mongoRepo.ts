import { Mongo } from "@src/dataAccess/mongodb";
import mongodb from "mongodb";
import User from "@src/entity/user";
import { IUserRepository } from "./index";
import { Service } from "typedi";

@Service()
export class MongoRepo implements IUserRepository {
  private model: mongodb.Collection;
  private connection: mongodb.MongoClient;

  constructor(mongo: Mongo) {
    const mongoClient = mongo.getMongoClient();
    this.connection = mongoClient;
    this.model = mongoClient.db().collection("user");
  }

  async create(user: Omit<User, "_id">) {
    await this.model.insertOne(user);
    return true;
  }

  async find() {
    return await this.model.find({}).toArray();
  }

  async findByEmail(email: string) {
    const user = await this.model.findOne({ email });
    if (user) user._id = user._id.toString();
    return user;
  }

  async remove() {
    return await this.model.deleteMany({});
  }

  async close(): Promise<void> {
    return await this.connection.close();
  }
}
