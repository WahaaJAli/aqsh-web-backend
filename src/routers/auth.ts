import { decryptPassword, encrpytPassword } from "../utils/passwordUtils"
import { IAuth, IAuthInput } from "../interfaces/IAuth"
import { IUser } from "../interfaces/IUser"
import { Router, Request, Response } from "express"
import { UserModal as User } from "../models/User"
import { validateUser as validate } from "../models/Auth"
import config from 'config'
import debugg from 'debug'

const router: Router = Router()
const BaseURL: string = '/'
const DEBUG = debugg(config.get('debug'))

router.get(BaseURL, async (_req: Request, res: Response): Promise<Response> => {
    const auth: IAuth[] = await User.find().sort({username: 1}).lean<IAuth[]>()
    return res.status(200).json({auth})
})

router.get(`${BaseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const auth: (IAuth | null) = await User.findById(req.params.id)
    return res.status(200).json({auth})
})

router.post(BaseURL, async (req: Request, res: Response): Promise<Response> => {
    const validatedUser: IAuthInput = validate(req.body)
    const existingUser: (IUser | null) = await User.findOne({email: validatedUser.email})
    if (!existingUser) return res.status(400).json({ message: "Inavalid email or password." })

    const encryptionKey: string = await encrpytPassword(validatedUser.password)
    const isValidPassword: boolean = await decryptPassword(encryptionKey, validatedUser.password)

    if (!isValidPassword) return res.status(400).json({message: "Invalid email or password."})
    const sessionToken: string = existingUser.generateAuthToken()
    return res.status(201).json({sessionToken})
})

router.put(`${BaseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const validatedUser: IAuthInput = validate(req.body)
    const auth: (IAuth | null) = await User.findByIdAndUpdate(req.params.id, validatedUser, {new: true})
    if (!auth) return res.status(404).json({ message: "Login Session not found." })
    return res.sendStatus(204)
})


router.delete(`${BaseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const auth: (IAuth | null) = await User.findByIdAndDelete(req.params.id)
    if (!auth) return res.status(404).json({ message: "Login Session not found." })
    return res.sendStatus(204)
})

export default router