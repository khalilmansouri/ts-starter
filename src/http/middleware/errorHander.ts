import { NextFunction, Request, Response } from "express";
import {
  Middleware,
  ExpressErrorMiddlewareInterface
} from "routing-controllers";
import { LoggerService } from "./logger";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ErrorHander implements ExpressErrorMiddlewareInterface {
  constructor(private loggerService: LoggerService) {}

  error(err: any, request: Request, response: Response, next: NextFunction) {
    // console.log("1")
    // this.loggerService.error({
    //   message: `${request.ip} ${response.statusCode} ${request.method} ${request.url} Internal Server Error`,
    //   error: error?.message,
    // })
    // console.log("2")
    // // Skip if headers are already sent
    // // if (response.headersSent) {
    // //   return next(error);
    // // }
    // let httpCode = error.status || 500
    // return response.status(httpCode).json({
    //   httpCode,
    //   message: error?.message,
    // });

    // // console.log("3")
    // Logs error
    this.loggerService.error({
      message: "Internal Server Error",
      error: err?.message
    });

    // Skip if headers are already sent
    if (response.headersSent) {
      return next(err);
    }

    // return a general error response
    return response.status(500).json({
      code: 500,
      msg: err?.message
    });
  }
}
