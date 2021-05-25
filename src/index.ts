import "reflect-metadata"
import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";
import { PostRepository } from "@src/repository/post"
import { PostController } from "@controller/post"


(async () => {

  // Init the database repository
  await Container.get(PostRepository).init()
  // User di Container 
  useContainer(Container)
  // Init express servver 
  createExpressServer({ controllers: [PostController] }).listen(5000, () => { console.log("Server is listring on 5000") })

})()