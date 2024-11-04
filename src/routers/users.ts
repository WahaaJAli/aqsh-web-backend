import { Router, Request, Response } from "express"
import { UserModal as User, validateUser as validate } from "../models/User"
import { ZodError } from "zod"
import { pick } from "rambda"
import { IUser, IUserInput } from "../interfaces/IUser"

const router: Router = Router()
const BaseURL: string = '/'
const userReq: (keyof IUser)[] = ['username', 'email', 'password']
const userRes: (keyof IUser)[] = ['_id', 'username', 'email']

router.get(BaseURL, async (req: Request, res: Response) => {
    await User.find().sort({username: 1}).lean()
        .then(result => { return res.status(200).json({result}) })
        .catch(error => res.status(error.status).json({error}))
})

router.get(`${BaseURL}:id`, async (req: Request, res: Response) => {
    await User.findById(req.params.id)
        .then(result => { return res.status(200).json({result}) })
        .catch(error => res.status(error.status).json({error}))
})

router.post(BaseURL, async (req: Request, res: Response) => {
    try {
        const validatedUser: IUserInput = validate(req.body)
        const existingUser: (IUser | null) = await User.findOne({email: validatedUser.email})
        if (existingUser) return res.status(409).json({ message: "User with the same email already Registered." })

        const user: IUser = await User.create(pick(userReq, validatedUser))
        await user.save()
        return res.status(201).json(pick(userRes, user))
    } 
    catch (error) {
        if(error instanceof ZodError) return res.status(422).json({error})
        else return res.status(404).json({error})
    }
})

router.put(`${BaseURL}:id`, async (req: Request, res: Response) => {
    try {
        validate(req.body)
        await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof ZodError) return res.status(422).json({error})
        else return res.status(404).json({error})
    }
})


router.delete(`${BaseURL}:id`, async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.sendStatus(204)
        
    } catch (error) {
        return res.status(404).json({error})
    }
})

export default router