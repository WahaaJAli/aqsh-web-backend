import config from '../config/Environment'
import logger from '../utils/logger'
import mongoose, { Mongoose } from 'mongoose'

mongoose.connection.on('disconnected', () => logger.info('MongoDB connection closed.') )

export default async () => {
  try {
    const { connection: { host } }: Mongoose = await mongoose.connect(config.DATABASE!, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    logger.info(`MongoDB Connected: ${host}`)
  }
  catch (error) {
    logger.error(`Database connection error: ${(error as Error).message}`)
    process.exit(1)
  }
}