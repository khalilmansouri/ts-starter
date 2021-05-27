import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";
import winston from "winston";

@Service()
export class LoggerService {
  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  public log(level: LogLevel, logInfo: LogObject) {
    this.logger.log(level, logInfo.message, { ...logInfo, message: undefined });
  }

  public info(logInfo: LogObject) {
    this.logger.log("info", logInfo.message, {
      ...logInfo,
      message: undefined,
    });
  }

  public error(logInfo: LogObject) {
    this.logger.log("error", logInfo.message, {
      ...logInfo,
      message: undefined,
    });
  }

  public debug(logInfo: LogObject) {
    this.logger.log("debug", logInfo.message, {
      ...logInfo,
      message: undefined,
    });
  }

  public warn(logInfo: LogObject) {
    this.logger.log("warn", logInfo.message, {
      ...logInfo,
      message: undefined,
    });
  }

  private logger;
}

export type LogLevel = "info" | "error" | "debug" | "warn";
type LogObject = {
  message: string;
  [key: string]: unknown;
};

@Service()
@Middleware({ type: "after" })
export class Logger implements ExpressMiddlewareInterface {

  constructor(private loggerService: LoggerService) { }


  use(req: Request, res: Response, next: NextFunction) {
    let logLevel: LogLevel = "info";
    const { statusCode } = req
    if (statusCode < 100 && statusCode >= 400) logLevel = "error";

    this.loggerService.log(logLevel, {
      message: `${req.ip} ${res.statusCode} ${req.method} ${req.url}`,
    })
    next()
  }

}




