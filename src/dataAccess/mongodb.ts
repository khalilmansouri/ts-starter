
import mongodb from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server"

export class mongo {
  static _instance?: mongo;
  private MONGO_DB_URI: string;
  private mockServer: MongoMemoryServer;

  static getInstance(): mongo {
    if (!mongo._instance) {
      mongo._instance = new mongo();
    }
    return mongo._instance;
  }

  async connect() {

    process.env.NODE_ENV = process.env.NODE_ENV || "development"
    switch (process.env.NODE_ENV) {
      case "production":
        this.MONGO_DB_URI = await new MongoMemoryServer().getUri("bible")//process.env.MONGO_DB_URI;
        break;
      case "staging":
        this.mockServer = new MongoMemoryServer();
        this.MONGO_DB_URI = await new MongoMemoryServer().getUri("bible")
        break;
      case "development":
        this.MONGO_DB_URI = "mongodb://localhost:27017/"
        break;
      case "test":
        this.MONGO_DB_URI = await new MongoMemoryServer().getUri("bible")
        break;
      default:
        break;
    }

    return await mongodb.connect(this.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  }
}