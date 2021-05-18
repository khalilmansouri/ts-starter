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

  console.log(await postService.find({}))
  postController = new PostController(new PostService(new MongodbRepo()))
  // console.log({ postService, postController })

  await new Promise(r => setTimeout(r, 2000))

  let http = new ExpressAPP()
  // console.log(Object.keys(postController.postService))
  http.GET("/", postController.find)
  http.POST("/", postController.create)
  http.listen(5000)
})()


