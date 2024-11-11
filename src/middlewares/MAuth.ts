import { NextFunction, Response } from 'express'
import config from 'config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import debugg from 'debug'
import IAuthRequest from '../interfaces/IAuthRequest'

/**
 * Authenticates the user by verifying the JWT token.
 * If the token is valid, the user information is attached to the request object.
 * Otherwise, a 401 or 400 response is sent back.
 */

const DEBUG = debugg(config.get('debug'))

const MAuth = async (req: IAuthRequest, res: Response, next: NextFunction): (Promise<void | Response>) => {
    const token = req.header('X-Auth-Token')
    if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' })
    try {
        req.user = jwt.verify(token, config.get<string>('JWTPrivateKey')) as JwtPayload
        next()
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid Token.' })
    }
}
export default MAuth