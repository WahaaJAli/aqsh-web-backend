import { NextFunction, Request, Response } from 'express'
import config from 'config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import debugg from 'debug'

/**
 * Authenticates the user by verifying the JWT token.
 * If the token is valid, the user information is attached to the request object.
 * Otherwise, a 401 or 400 response is sent back.
 */

const DEBUG = debugg(config.get('debug'))

const authenticator = async (req: any, res: Response, next: NextFunction): (Promise<void | Response<any, Record<string, any>>>) => {
    const token = req.header('X-Auth-Token')
    if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' })
    try {
        req.user = jwt.verify(token, config.get<string>('JWTPrivateKey'))
        next()
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid Token.' })
    }
}
export default authenticator