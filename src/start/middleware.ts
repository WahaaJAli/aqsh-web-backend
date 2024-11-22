import config from '../config/Environment'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const middleware = (server: Application): void => {
  server.use(express.json())
  server.use(express.static('public'))
  server.use(cors())
  server.use(helmet())
  server.use(express.urlencoded({ extended: true }))

  if (config.ENVIRONMENT === 'development') { server.use(morgan('dev')) }
}

export default middleware