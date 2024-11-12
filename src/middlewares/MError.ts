import { ErrorRequestHandler } from 'express'
import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
import config from "config"
import debugg from "debug"

/**
 * Global error handling middleware.
 * @param error - The error object.
 * @param _req - The incoming request object (unused).
 * @param res - The outgoing response object.
 * @param next - The next middleware function.
 */

interface CustomError extends Error {
    status?: number
}

const DEBUG = debugg(config.get<string>("debug"))

const MError: ErrorRequestHandler = (error: CustomError, _req: Request, res: Response, _next: NextFunction): Response => {
    if (error instanceof ZodError) { return res.status(422).json({message: error.message}) }
    return res.status(error.status || 500).json({ message: error.message })
}

export default MError