import config from '../config/Environment'
import logger from '../utils/logger'
import mongoose, { Mongoose } from 'mongoose'

mongoose.connection.on('disconnected', () => logger.info('MongoDB connection closed.') )

export default async () => {
  try {
    mongoose.connect(config.DATABASE!)
    logger.info(`MongoDB Connected: 2222`)
  }
  catch (error) {
    logger.error(`Database connection error: ${(error as Error).message}`)
    process.exit(1)
  }
}