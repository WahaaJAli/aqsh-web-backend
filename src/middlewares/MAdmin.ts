import { NextFunction, Response } from 'express'
import IAuthRequest from '../interfaces/IAuthRequest'

const MAdmin = (req: IAuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) res.status(403).json({ message: 'Access Forbidden: Admin privileges required.' })
  next()
}

export default MAdmin