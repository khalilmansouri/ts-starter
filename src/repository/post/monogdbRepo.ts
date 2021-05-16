// import { Connection, Schema, Document, Model, mongo } from "mongoose";
import { Post, PostQuery } from "@entity/post";
// import { getModelForClass, getModelWithString } from "@typegoose/typegoose";
import { PostRepository } from "@repository/post/baseRepo";
import mongodb from "mongodb";
import { mongo } from "../../dataAcess/mongodb"


// (async () => {
//   console.log("DB connected ... !");
//   mongoClient = await mongodb.connect("mongodb://localhost:27017/bible", { useNewUrlParser: true, useUnifiedTopology: true })
//   console.log(mongoClient);
// })();


export class mongodbRepo implements PostRepository {
  private _db: mongodb.Db;
  constructor() {
    mongo.getInstance().connect((err, mongoClient) => {
      if (err) throw err;
      else
        this._db = mongoClient.db()
    })
  }

  async create(post: Post): Promise<Boolean> {
    try {
      await this._db.collection("post").insertOne(post);
      return true
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  async find(query: PostQuery): Promise<Post[]> {
    return await this._db.collection("post").find(query).toArray();
  }

  async findById(id: string): Promise<Post> {
    return await this._db.collection("post").findOne({ _id: id })
  }

}

export default new mongodbRepo()

