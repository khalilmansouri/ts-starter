import "reflect-metadata"
import { Container } from "typedi";
import { ExpressServer } from "@http/express"
import { MongodbRepo } from "@repository/post/monogdbRepo"
import { PostController } from "@controller/post"




(async () => {

  // Init the database repository
  await Container.get(MongodbRepo).init()

  // init Post controller
  const postController = Container.get(PostController)


  let http = new ExpressServer()
  http.GET("/", postController.find)
  http.listen(5000)
})()