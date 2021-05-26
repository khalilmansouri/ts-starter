import "reflect-metadata"
import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";
import { PostController } from "@controller/post"
import { Mongo } from "./dataAccess/mongodb";


const main = async () => {
  await Container.get(Mongo).connect()
  useContainer(Container)
  createExpressServer({ controllers: [PostController] })
    .listen(5000, () => { console.log("Server is listring on 5000") })
}

main()