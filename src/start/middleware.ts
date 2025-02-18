import config from '../config/Environment'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const middlewares = (server: Application): void => {
  server.use(cors({ origin: config.CLIENT, credentials: true, methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS' }))
  server.use(express.json())
  server.use(helmet({ crossOriginEmbedderPolicy: false }))
  server.use(express.urlencoded({ extended: true }))
  
  console.log('CORS Origin:', config.CLIENT)
  if (config.ENVIRONMENT === 'development') { server.use(morgan('dev')) }
}

export default middlewares