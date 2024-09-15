import { Request, Response, NextFunction } from "express"

const authenticator = (req: Request, res: Response, next: NextFunction) => {
    console.log('...authenticating')
    next()
}

export default authenticator