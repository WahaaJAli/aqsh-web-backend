import errorHandler from './src/middlewares/MError'
import express, { Application } from 'express'
import loadMiddlewares from './src/start/middleware'
import loadRoutes from './src/start/routes'
import limiter from './src/middlewares/MRateLimiter'
import helmet from 'helmet'

const app: Application = express()

loadMiddlewares(app)
loadRoutes(app)
app.use('/auth', limiter)
app.use(helmet({ crossOriginEmbedderPolicy: false }))
app.use(errorHandler) // errorHandler should be last Middleware

export default app