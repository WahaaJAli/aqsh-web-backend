import { encrpytPassword } from "../utils/passwordUtils"
import { IUser, IUserInput } from "../interfaces/IUser"
import { pick } from "rambda"
import { Router, Request, Response } from "express"
import { UserModal as User, validateUser as validate } from "../models/User"
import config from 'config'
import debugg from 'debug'
import IAuthRequest from "../interfaces/IAuthRequest"
import MAuth from "../middlewares/MAuth"

const router: Router = Router()
const BaseURL: string = '/'
const userReq: (keyof IUser)[] = ['username', 'email', 'password']
const userRes: (keyof IUser)[] = ['_id', 'username', 'email']
const DEBUG = debugg(config.get('debug'))

router.get(BaseURL, async (_req: Request, res: Response): Promise<Response> => {
    const users: IUser[] = await User.find().sort({username: 1}).lean<IUser[]>()
    return res.status(200).json({users})
})

router.get(`${BaseURL}me`, MAuth, async (req: IAuthRequest, res: Response): Promise<Response> => {
    const user: (IUser | null) = await User.findById(req.user?._id).select('-password').lean<IUser>()
    return res.status(200).json({user})
})

router.post(BaseURL, async (req: Request, res: Response): Promise<Response> => {
    const validatedUser: IUserInput = validate(req.body)
    const existingUser: (IUser | null) = await User.findOne({email: validatedUser.email})
    if (existingUser) return res.status(409).json({ message: "User with the same email already Registered." })

    validatedUser.password = await encrpytPassword(validatedUser.password)
    const user: IUser = await User.create(pick(userReq, validatedUser))
    await user.save()
    return res.header('X-Auth-Token', user.generateAuthToken()).status(201).json(pick(userRes, user))
})

router.put(`${BaseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const validatedUser: IUserInput = validate(req.body)
    const user: (IUser | null) = await User.findByIdAndUpdate(req.params.id, validatedUser, {new: true})
    if (!user) return res.status(404).json({ message: "User not found." })
    return res.sendStatus(204)
})


router.delete(`${BaseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const user: (IUser | null) = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found." })
    return res.sendStatus(204)
})

export default router