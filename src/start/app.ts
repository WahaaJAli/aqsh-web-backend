import MError from '../middlewares/MError'
import express, { Application } from 'express'
import limiter from '../middlewares/MRateLimiter'
import loadMiddlewares from './middleware'
import loadRoutes from './routes'
import mongoose from 'mongoose'

const app: Application = express()

loadMiddlewares(app)
loadRoutes(app)
app.get('/test-db', async (req, res) => {
    try {
      if (mongoose.connection.db) {
        await mongoose.connection.db.admin().ping()
        res.status(200).json({ message: 'Database connected successfully!' })
      }
      else {
        res.status(500).json({ message: 'Database connection failed', error: 'Database is undefined' })
      }
      res.status(200).json({ message: 'Database connected successfully!' })
    }
    catch (error) {
      res.status(500).json({ message: 'Database connection failed', error: (error as Error).message })
    }
})
app.use('/auth', limiter)
app.use(MError) // errorHandler should be last Middleware

export default app