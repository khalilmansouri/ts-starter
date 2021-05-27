
// import "reflect-metadata"
import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";
import { PostController } from "@controller/post"
import { Application } from "express";
import { Logger } from "@http/middleware/logger"
import { ErrorHander } from "@http/middleware/errorHander"



useContainer(Container)
export const app = createExpressServer({
  defaultErrorHandler: false,
  controllers: [PostController],
  middlewares: [ErrorHander, Logger]
}) as Application