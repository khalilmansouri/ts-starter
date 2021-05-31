import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  ExpressMiddlewareInterface,
  HttpError
} from "routing-controllers";
import { LoggerService } from "./logger";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ErrorHander implements ExpressErrorMiddlewareInterface {
  constructor(private loggerService: LoggerService) {}

  error(err: any, request: Request, response: Response, next: NextFunction) {
    const { httpCode = 500, message = "Internal Server Error" } = err || {};

    this.loggerService.error({
      message: `${request.ip} ${httpCode} ${request.method} ${request.url} ${message}`,
      error: message
    });

    // Skip if headers are already sent
    if (response.headersSent) {
      return next(err);
    }

    // return a general error response
    return response.status(httpCode).json({
      httpCode,
      message
    });
  }
}

@Service()
@Middleware({ type: "after" })
export class NotFoundErrorHander implements ExpressMiddlewareInterface {
  use: RequestHandler = (req, res) => {
    throw new HttpError(400, "Not Found");
  };
}
