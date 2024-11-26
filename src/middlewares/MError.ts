import { ErrorRequestHandler } from 'express'
import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

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

const MError: ErrorRequestHandler = (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ZodError) return res.status(422).json({message: error.message})
    return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' })
}

export default MError