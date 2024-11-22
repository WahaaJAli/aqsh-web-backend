import { createLogger, format, transports } from 'winston'
import mongoose from 'mongoose'
import config from '../config/Environment'

const { combine, timestamp, printf, colorize, errors } = format

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`
})

const logger = createLogger({
    level: config.LOG_LEVEL || 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
    exitOnError: false
})

logger.exceptions.handle(
    new transports.Console(),
    new transports.File({ filename: 'logs/exceptions.log' })
)

let isShuttingDown: boolean = false

const handleExit = async (error?: Error) => {
    if (isShuttingDown) return
    isShuttingDown = true
    if (error) logger.error(`Critical Error: ${error.message}`, { stack: error.stack })
    await mongoose.connection.close()
    logger.info('Database connection closed due to unhandled rejection.')
    process.exit(1)
}
  
process.on('uncaughtException', handleExit)
process.on('unhandledRejection', (reason: any) => handleExit(reason))

export default logger