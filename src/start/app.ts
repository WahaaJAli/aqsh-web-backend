import errorHandler from '../middlewares/MError'
import express, { Application } from 'express'
import limiter from '../middlewares/MRateLimiter'
import loadMiddlewares from './middleware'
import loadRoutes from './routes'
import path from 'path'

const app: Application = express()

loadMiddlewares(app)
loadRoutes(app)
app.use('/auth', limiter)
app.use(express.static(path.join(__dirname, '../public')))
app.use(errorHandler) // errorHandler should be last Middleware

export default app