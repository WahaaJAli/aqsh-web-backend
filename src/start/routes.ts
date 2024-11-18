import { Application } from "express"

import auth from '../routers/auth'
import banks from '../routers/banks'
import customers from '../routers/customers'
import home from '../routers/home'
import promise from '../routers/promise'
import users from '../routers/users'
import MError from '../middlewares/MError'

export default function modules(server: Application) {
    server.use('/', home)
    server.use('/auth', auth)
    server.use('/banks', banks)
    server.use('/customers', customers)
    server.use('/promise', promise)
    server.use('/users', users)
    server.use(MError)
}