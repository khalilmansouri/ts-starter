
// import "reflect-metadata"
import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";
import { PostController } from "@controller/post"
import { Application } from "express";
import { Logger } from "@http/middleware/logger"
import { ErrorHander } from "@http/middleware/errorHander"
import { accessControl } from "@http/middleware/accessControl"



useContainer(Container)
export const app = createExpressServer({
  authorizationChecker: accessControl,
  defaultErrorHandler: false,
  controllers: [PostController],
  middlewares: [ErrorHander, Logger]
}) as Application