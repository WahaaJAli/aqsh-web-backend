import config from '../config/Environment'
import logger from '../utils/logger'
import mongoose from 'mongoose'

mongoose.connection.on('disconnected', () => logger.info('MongoDB connection closed.') )

export default async (): Promise<void> => {
  try {
    await mongoose.connect(config.DATABASE!)
    logger.info('Database: Connected to MongoDB')
  }
  catch (error) {
    logger.error(`Database connection error: ${(error as Error).message}`)
    process.exit(1)
  }
}