import express from 'express';
const router = express.Router()
import mongodbRepo from "@repository/post/monogdbRepo"
import { Post } from '@entity/post';

const app = express();

app.use(express.json({ limit: "5mb" }))

app.post('/', async (request: express.Request, response) => {
  let p: Post = { id: "1", title: "title1", text: "text1" }
  let ret = await mongodbRepo.create(p)
  response.send(ret);
});

app.get('/', async (request: express.Request, response) => {
  let posts = await mongodbRepo.find({})
  response.send(posts);
});

app.listen(5000, () => { console.log("Express is UP") });