import { decryptPassword, encrpytPassword } from "../utils/passwordUtils"
import { IAuthInput } from "../interfaces/IAuth"
import { IUser } from "../interfaces/IUser"
import { Router, Request, Response } from "express"
import { UserModal as User } from "../models/User"
import { validateUser as validate } from "../models/Auth"
import { ZodError } from "zod"
import config from 'config'
import debugg from 'debug'
import jwt from 'jsonwebtoken'

const router: Router = Router()
const BaseURL: string = '/'
const DEBUG = debugg(config.get('debug'))

router.get(BaseURL, async (_req: Request, res: Response): (Promise<Response | void>) => {
    await User.find().sort({username: 1}).lean()
        .then(result => { return res.status(200).json({result}) })
        .catch(error => res.status(error.status).json({error}))
})

router.get(`${BaseURL}:id`, async (req: Request, res: Response): (Promise<Response | void>) => {
    await User.findById(req.params.id)
        .then(result => { return res.status(200).json({result}) })
        .catch(error => res.status(error.status).json({error}))
})

router.post(BaseURL, async (req: Request, res: Response): Promise<Response> => {
    try {
        const validatedUser: IAuthInput = validate(req.body)
        const existingUser: (IUser | null) = await User.findOne({email: validatedUser.email})
        if (!existingUser) return res.status(400).json({ message: "Inavalid email or password." })

        const encryption: string = await encrpytPassword(validatedUser.password)
        const isValidPassword: boolean = await decryptPassword(encryption, validatedUser.password)
        
        if (!isValidPassword) return res.status(400).json({message: "Invalid email or password."})
        const sessionToken: string = existingUser.generateAuthToken()
        return res.status(201).json({sessionToken})
    }
    catch (error) {
        if(error instanceof ZodError) return res.status(422).json({error})
        else return res.status(404).json({error})
    }
})

router.put(`${BaseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    try {
        validate(req.body)
        await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof ZodError) return res.status(422).json({error})
        else return res.status(404).json({error})
    }
})


router.delete(`${BaseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.sendStatus(204)
        
    } catch (error) {
        return res.status(404).json({error})
    }
})

export default router