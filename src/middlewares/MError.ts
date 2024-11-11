import { Request, Response, NextFunction } from "express"
import config from "config"
import debugg from "debug"

const DEBUG = debugg(config.get<string>("debug"))

interface CustomError extends Error {
    status?: number
}

/**
 * Global error handling middleware.
 * @param error - The error object.
 * @param _req - The incoming request object (unused).
 * @param res - The outgoing response object.
 * @param next - The next middleware function.
 */

const MError = (error: CustomError, _req: Request, res: Response, next: NextFunction): Response => {
    DEBUG("Error: ", error)
    return res.status(error.status || 500).json({error})
}

export default MError