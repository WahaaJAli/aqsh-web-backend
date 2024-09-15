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
const port = process.env.PORT ?? 2123;
const debug = debugg(config.get('debug'))
const debugDb = debugg(config.get('debug-db'))
const ENVIRONMENT = 'env'

server.use(express.json(), express.static('public'), cors(), helmet(), express.urlencoded({extended: true}))

mongoDb.connect('mongodb://0.0.0.0:27017/aqsh')
    .then((): void => debugDb('Database: Connected to MongoDB'))
    .catch(err => debugDb(`Database: Connection failed due to: ${err}`))

if(server.get(ENVIRONMENT) === 'development') { 
    server.use(morgan('dev'))
    debug('Environment: Development')
}
else if(server.get(ENVIRONMENT) === 'production') {
    debug('Environment: Production')
}

server.use('/', home)
server.use('/promise', promise)
server.use('/banks', banks)
server.use('/customers', customers)

server.listen(port, (): void => debug(`Server started on port ${port}`))