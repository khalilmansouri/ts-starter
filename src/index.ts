import { ExpressAPP } from "@http/express"
import { MongodbRepo } from "@repository/post/monogdbRepo"
import { PostController } from "@controller/post"
import { PostService } from "@service/post"

console.clear()


let postController: PostController;
let postService: PostService;


(async () => {
  let postRepo = new MongodbRepo();
  await postRepo.init()

  postService = new PostService(postRepo);
  postController = new PostController(new PostService(new MongodbRepo()))

  await new Promise(r => setTimeout(r, 2000))


  let http = new ExpressAPP()
  http.GET("/", postController.find)
  http.listen(5000)
})()


