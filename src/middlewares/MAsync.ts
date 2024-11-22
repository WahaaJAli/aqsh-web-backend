import { Request, Response, NextFunction, RequestHandler } from "express"
import debug from 'debug'
import config from "../config/Environment"
import logger from "../utils/logger"

/**
 * Async middleware wrapper to handle errors.
 * @param handler - The async route handler to wrap.
 * @returns An Express request handler.
 */

const DEBUG = debug(config.DEBUG)

const MAsync = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    } 
    catch (error) {
      DEBUG("Async error:", error)
      logger.error("Async error:", error)
      next(error)
    }
  }
}

export default MAsync
