import express from 'express'
import config from 'config'
import debugg from 'debug'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoDb from 'mongoose'
import banks from './src/routers/banks'
import customers from './src/routers/customers'
import home from './src/routers/home'
import promise from './src/routers/promise'

const server = express()
const PORT = process.env.PORT ?? 2123;
const DEBUG = debugg(config.get('debug'))
const ENVIRONMENT: string = 'env'
const DATABASE: string = config.get('database.connection')

server.use(express.json(), express.static('public'), cors(), helmet(), express.urlencoded({extended: true}))

mongoDb.connect(DATABASE)
    .then((): void => DEBUG('Database: Connected to MongoDB'))
    .catch(err => DEBUG(`Database: Connection failed due to: ${err}`))

if(server.get(ENVIRONMENT) === 'development') { 
    server.use(morgan('dev'))
    DEBUG('Environment: Development')
}
else if(server.get(ENVIRONMENT) === 'production') {
    DEBUG('Environment: Production')
}

server.use('/', home)
server.use('/promise', promise)
server.use('/banks', banks)
server.use('/customers', customers)

server.listen(PORT, (): void => DEBUG(`Server started on Port: ${PORT}`))