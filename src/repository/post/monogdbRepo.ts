import { Post, PostQuery } from "@entity/post";
import { PostRepository } from "@src/repository/post";
import mongodb from "mongodb";
import { mongo } from "@src/dataAcess/mongodb"



export class MongodbRepo implements PostRepository {

  private model: mongodb.Collection;
  private connection: mongodb.MongoClient;

  // constructor(mongoClient: mongodb.MongoClient) {
  //   this.connection = mongoClient;
  //   this.model = mongoClient.db().collection("post")
  // }

  constructor() { }

  async init() {
    let mongoClient = await mongo.getInstance().connect()
    this.connection = mongoClient;
    this.model = mongoClient.db().collection("post")
    console.log("DB Conntected ...")
  }

  async close(): Promise<void> {
    return await this.connection.close()
  }

  async create(post: Omit<Post, "_id">): Promise<Boolean> {
    try {
      await this.model.insertOne(post);
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  async find(query: PostQuery): Promise<Post[]> {
    return await this.model.find(query).toArray();
  }

  async remove() {
    return await this.model.deleteMany({})
  }

  async findById(_id: string): Promise<Post> {
    return await this.model.findOne({ _id })
  }

}


