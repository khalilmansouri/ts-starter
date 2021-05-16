
import mongodb from "mongodb";

const DB_URI = "mongodb://localhost:27017/bible"

export class mongo {
  static _instance?: mongo;

  static getInstance(): mongo {
    if (!mongo._instance) {
      mongo._instance = new mongo();
    }
    return mongo._instance;
  }

  connect(cb: mongodb.MongoCallback<mongodb.MongoClient>) {
    mongodb.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, mongodbClient) => {
      if (err) throw cb(err, null);
      else
        cb(null, mongodbClient)
    })
  }
}