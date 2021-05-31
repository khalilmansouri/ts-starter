import { Post, PostQuery } from "@entity/post";
import { IPostRepository } from "@src/repository/post";
import mongodb, { ObjectId } from "mongodb";
import { Service } from "typedi";
import { Mongo } from "@src/dataAccess/mongodb";


@Service()
export class MongoRepo implements IPostRepository {

  private model: mongodb.Collection;
  private connection: mongodb.MongoClient;


  constructor(mongo: Mongo) {
    const mongoClient = mongo.getMongoClient();
    this.connection = mongoClient;
    this.model = mongoClient.db().collection("post");
  }

  // async init() {
  //   let mongoClient = await Mongo.getInstance().connect()
  //   this.connection = mongoClient;
  //   this.model = mongoClient.db().collection("post")
  // }

  async close(): Promise<void> {
    return await this.connection.close();
  }

  async create(post: Omit<Post, "_id">): Promise<boolean> {
    try {
      await this.model.insertOne(post);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async find(query: PostQuery): Promise<Post[]> {
    const posts = await this.model.find(query).toArray();
    return posts.map(post => { return { ...post, _id: post._id.toString() }; });
  }

  async remove() {
    return await this.model.deleteMany({});
  }

  async findById(id: string): Promise<Post> {
    const post = await this.model.findOne({ _id: new ObjectId(id) });
    post._id = post._id.toString();
    return post;
  }

}


