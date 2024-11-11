import express, { Application, Request, Response, NextFunction } from 'express'
import config from 'config'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import debugg from 'debug'

import auth from './src/routers/auth'
import banks from './src/routers/banks'
import customers from './src/routers/customers'
import home from './src/routers/home'
import promise from './src/routers/promise'
import users from './src/routers/users'
import MError from './src/middlewares/MError'

// Initialize Debug
const DEBUG = debugg(config.get<string>('debug'))

// Environment Variables and Configurations
const server: Application = express()
const PORT: number = Number(process.env.PORT) || 2123
const ENVIRONMENT: string = process.env.NODE_ENV || 'development'
const DATABASE_PASSWORD: string = process.env['aqsh-db-password'] || ''
const DATABASE: string = config.get<string>('database.connection').replace('<password>', DATABASE_PASSWORD)
const JWT_KEY: string = config.get<string>('JWTPrivateKey')

// Middleware Configuration
server.use(express.json(), express.static('public'), cors(), helmet(), express.urlencoded({ extended: true }))

if (!JWT_KEY) {
  console.error('Error: Missing JWTPrivateKey in environment variables.')
  process.exit(1)
}

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(DATABASE)
    DEBUG('Database: Connected to MongoDB')
  } catch (err) {
    DEBUG(`Database: Connection failed due to: ${err}`)
    process.exit(1)
  }
}

// Environment-specific configurations
if (ENVIRONMENT === 'development') {
  server.use(morgan('dev'))
  DEBUG('Environment: Development')
}
else if (ENVIRONMENT === 'production') {
  DEBUG('Environment: Production')
}

// Route Handlers
server.use('/', home)
server.use('/auth', auth)
server.use('/banks', banks)
server.use('/customers', customers)
server.use('/promise', promise)
server.use('/users', users)

// Error Handling Middleware
server.use(MError)

const startServer = async (): Promise<void> => {
  await connectToDatabase()
  server.listen(PORT, (): void => DEBUG(`Server: Started on Port ${PORT}`))
}

startServer()

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('Server shutting down...')
  process.exit(0)
})
process.on('SIGTERM', () => {
  console.log('Server terminated.')
  process.exit(0)
})