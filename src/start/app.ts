import errorHandler from '../middlewares/MError'
import express, { Application } from 'express'
import loadMiddlewares from './middleware'
import loadRoutes from './routes'
import limiter from '../middlewares/MRateLimiter'
import helmet from 'helmet'

const app: Application = express()

loadMiddlewares(app)
loadRoutes(app)
app.use('/auth', limiter)
app.use(helmet({ crossOriginEmbedderPolicy: false }))
app.use(errorHandler) // errorHandler should be last Middleware

export default app