import MError from '../middlewares/MError'
import express, { Application } from 'express'
import limiter from '../middlewares/MRateLimiter'
import loadMiddlewares from './middleware'
import loadRoutes from './routes'

const app: Application = express()

loadMiddlewares(app)
loadRoutes(app)
app.use('/auth', limiter)
app.use(MError) // errorHandler should be last Middleware

export default app