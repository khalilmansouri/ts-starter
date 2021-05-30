import { NextFunction, Request, Response } from "express";
import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { LoggerService } from "./logger"
import { Service } from "typedi";

@Service()
@Middleware({ type: 'before' })
export class ErrorHander implements ExpressErrorMiddlewareInterface {
  constructor(private loggerService: LoggerService) { }

  error(error: any, request: Request, response: Response, next: NextFunction) {

    this.loggerService.error({
      message: `${request.ip} ${response.statusCode} ${request.method} ${request.url} Internal Server Error`,
      error: error?.message,
    })

    // Skip if headers are already sent
    if (response.headersSent) {
      return next(error);
    }
    let httpCode = error.status || 500
    response.status(httpCode).json({
      httpCode,
      message: error?.message,
    });
  }

}