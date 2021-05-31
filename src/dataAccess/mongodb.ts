import mongodb, { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Service } from "typedi";

@Service()
export class Mongo {
  private MONGO_DB_URI: string;
  protected mongoClient: MongoClient;

  getMongoClient(): MongoClient {
    return this.mongoClient;
  }

  async connect() {
    process.env.NODE_ENV = process.env.NODE_ENV || "development";
    switch (process.env.NODE_ENV) {
      case "production":
        this.MONGO_DB_URI = await new MongoMemoryServer().getUri("bible"); //process.env.MONGO_DB_URI;
        break;
      case "staging":
        this.MONGO_DB_URI = await new MongoMemoryServer().getUri("bible");
        break;
      case "development":
        this.MONGO_DB_URI = "mongodb://localhost:27017/";
        break;
      case "test":
        this.MONGO_DB_URI = await new MongoMemoryServer().getUri("bible");
        break;
      default:
        break;
    }

    this.mongoClient = await mongodb.connect(this.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async disconnect() {
    await this.mongoClient.close();
    // await new Promise((resolve, reject) => {
    //   this.mongoClient.close((error) => {
    //     if (!error) {
    //       resolve("Disconnceted")
    //     }
    //     else {
    //       console.log(error)
    //       reject(error)
    //     }
    //   })
    // })
  }
}
