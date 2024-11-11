import { NextFunction, Response } from 'express'
import IAuthRequest from '../interfaces/IAuthRequest'

const MAdmin = async (req: IAuthRequest, res: Response, next: NextFunction): (Promise<void | Response>) => {
    if (!req.user?.isAdmin) { return res.status(403).json({ message: 'Access Forbidden.' }) }
    next()
}

export default MAdmin