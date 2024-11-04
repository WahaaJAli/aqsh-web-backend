import { BankModel as Bank, validateBank as validate } from '../models/Bank'
import { Router, Request, Response } from 'express'
import { ZodError } from 'zod'
import config from 'config'
import debugg from 'debug'
import IBank from '../interfaces/IBank'


const router = Router()
const baseURL = '/'
const debugDb = debugg(config.get('debug-db'))

router.get(baseURL, async (req: Request, res: Response) => {
    // .find({ nickname: { $nin: ['FAYS', 'MUCB'] } })
    // .or([ { nickname: 'FAYS'}, {BIC: 'FAYSPKKA'}])
    // Regular Expression 
    // .find({ nickname: /^Startswith, Endswith$, .*Between.*/i(case Insensitive)})
    // Pagination 
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)

    // mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray
    await Bank.find({bic: /PKKA$/i}).sort({bankName: 1}).lean()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(error.status).json({error}))
})


router.get(`${baseURL}:id`, async (req: Request, res: Response) => {
    await Bank.findById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(error.status).json({error}))
})


router.post(baseURL, async (req: Request, res: Response) => {
    try {
        validate(req.body)
        const existingBank: (IBank | null) = await Bank.findOne({nickname: req.body.nickname})
        if (existingBank) return res.status(409).json({ message: "Bank with the same Nickname already exists." })

        const bank: IBank = await Bank.create(req.body)
        await bank.save()
        return res.status(200).json(bank)
    }
    catch (error) {
        if(error instanceof ZodError) return res.status(422).json({error})
        else return res.status(404).json({error})
    }
})


router.put(`${baseURL}:id`, async(req: Request, res: Response) => {
    try {
        validate(req.body)
        await Bank.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.sendStatus(204)
    }
    catch (error) {
        if(error instanceof ZodError) return res.status(422).json({error})
        else return res.status(404).json({error})
    }
})


router.delete(`${baseURL}:id`, async (req: Request, res: Response) => {
    try {
        await Bank.findByIdAndDelete(req.params.id)
        return res.sendStatus(204)
    }
    catch (error) {
        return res.status(404).json({error})
    }
})

export default router