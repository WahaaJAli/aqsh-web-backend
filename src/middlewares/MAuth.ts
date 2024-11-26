import { NextFunction, Response } from 'express'
import config from '../config/Environment'
import IAuthRequest from '../interfaces/IAuthRequest'
import jwt, { JwtPayload } from 'jsonwebtoken'

const MAuth = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('X-Auth-Token')
  if (!token) return res.status(403).json({ message: 'Access Forbidden: No token provided.' })

  try {
    req.user = jwt.verify(token, config.JWT_KEY) as JwtPayload
    return next()
  }
  catch (error) { return res.status(403).json({ message: 'Access Forbidden: Invalid or expired token.' }) }
}

export default MAuth