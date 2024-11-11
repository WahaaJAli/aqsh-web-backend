import { Request, Response, NextFunction, RequestHandler } from "express"
import config from "config"
import debugg from "debug"

const DEBUG = debugg(config.get<string>("debug"))

/**
 * Async middleware wrapper to handle errors.
 * @param handler - The async route handler to wrap.
 * @returns An Express request handler.
 */

const MAsync = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    } 
    catch (error) {
      DEBUG("Async error:", error)
      next(error)
    }
  }
}

export default MAsync
