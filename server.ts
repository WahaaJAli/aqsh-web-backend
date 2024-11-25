import config from './src/config/Environment'
import app from './app'
import connectToDatabase from './src/start/mongoose'
import logger from './src/utils/logger'
import mongoose from 'mongoose'
 
const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase()
    const server = app.listen(config.PORT, () => logger.info(`Server started on port ${config.PORT}`))

    const gracefulShutdown = async () => {
        try {
          logger.info('Server shutting down...')
          await Promise.all([
            mongoose.connection.close().then(() => logger.info('Database connection closed.')),
            new Promise<void>((resolve, reject) => {
              server.close((err) => {
                if (err) return reject(err)
                logger.info('HTTP server closed.')
                resolve()
              })
            })
          ])
          process.exit(0)
        }
        catch (error) {
          logger.error(`Error during graceful shutdown: ${(error as Error).message}`)
          process.exit(1)
        }
    }      

    process.on('SIGINT', gracefulShutdown)
    process.on('SIGTERM', gracefulShutdown)
  }
  catch (error) {
    logger.error(`Server failed to start: ${(error as {message: string}).message}`)
    process.exit(1)
  }
}

startServer()

process.on('uncaughtException', (error: Error) => {
  logger.error(`Uncaught Exception: ${error.message}`, {stack: error.stack})
  process.exit(1)
})

// netstat -aon | findstr :2123
// taskkill /F /PID <PID>