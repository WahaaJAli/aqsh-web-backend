import { JwtPayload } from "jsonwebtoken"
import { Request } from 'express'

export default interface IAuthRequest extends Request {
    user?: JwtPayload
}