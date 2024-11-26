import { NextFunction, Response } from 'express'
import { UserModal as User } from "../../../src/models/User"
import IAuthRequest from "../../../src/interfaces/IAuthRequest"
import MAuth from "../../../src/middlewares/MAuth"
import mongoose from "mongoose"

describe("MAuth Middleware", () => {
    it("should return a valid JWT in req.user", () => {
        const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: false }
        const token: string = new User(user).generateAuthToken()
        const req = { header: jest.fn().mockReturnValue(token) } as unknown as IAuthRequest
        const res: Response = {} as Response
        const next: NextFunction = jest.fn()

        MAuth(req, res, next)

        expect(req.user).toMatchObject(user)
        expect(next).toHaveBeenCalled()
    })
})