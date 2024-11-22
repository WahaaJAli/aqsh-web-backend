import { NextFunction, Response } from 'express'
import config from '../config/Environment'
import IAuthRequest from '../interfaces/IAuthRequest'
import jwt, { JwtPayload } from 'jsonwebtoken'

/**
 * Authenticates the user by verifying the JWT token.
 * If the token is valid, the user information is attached to the request object.
 * Otherwise, a 401 or 400 response is sent back.
 */

const DEBUG = config.DEBUG

const MAuth = async (req: IAuthRequest, res: Response, next: NextFunction): (Promise<void | Response>) => {
    const token = req.header('X-Auth-Token')
    if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' })
    try {
        req.user = jwt.verify(token, config.JWT_KEY) as JwtPayload
        next()
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid Token.' })
    }
}
export default MAuth