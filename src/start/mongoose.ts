import config from '../config/Environment'
import logger from '../utils/logger'
import mongoose, { Mongoose } from 'mongoose'

mongoose.connection.on('disconnected', () => logger.info('MongoDB connection closed.') )

export default async (): Promise<void> => {
  try {
    const { connection: { host } }: Mongoose = await mongoose.connect(config.DATABASE!)
    logger.info(`MongoDB Connected: ${host}`)
  }
  catch (error) {
    logger.error(`Database connection error: ${(error as Error).message}`)
    process.exit(1)
  }
}