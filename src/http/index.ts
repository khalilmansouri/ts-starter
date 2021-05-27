
// import "reflect-metadata"
import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";
import { PostController } from "@controller/post"
import { Application } from "express";
import { Logger } from "@http/middleware/logger"



useContainer(Container)
export const app = createExpressServer({
  controllers: [PostController],
  middlewares: [Logger]
}) as Application