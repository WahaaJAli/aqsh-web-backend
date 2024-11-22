import { BankModel as Bank, validateBank as validate } from '../models/Bank'
import { Router, Request, Response } from 'express'
import {IBank, IBankInput } from '../interfaces/IBank'
import MAdmin from '../middlewares/MAdmin'
import MAuth from '../middlewares/MAuth'

const router = Router()
const baseURL = '/'

router.get(baseURL, async (_req: Request, res: Response): Promise<Response> => {
    // .find({ nickname: { $nin: ['FAYS', 'MUCB'] } })
    // .or([ { nickname: 'FAYS'}, {BIC: 'FAYSPKKA'}])
    // Regular Expression 
    // .find({ nickname: /^Startswith, Endswith$, .*Between.*/i(case Insensitive)})
    // Pagination 
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)

    // mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray
    const banks: IBank[] = await Bank.find({bic: /PKKA$/i}).sort({bankName: 1}).lean<IBank[]>()
    return res.status(200).json(banks)
})


router.get(`${baseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const bank: (IBank | null) = await Bank.findById(req.params.id).lean<IBank>()
    return res.status(200).json(bank)
})


router.post(baseURL, async (req: Request, res: Response): Promise<Response> => {
    const validatedBank: IBankInput = validate(req.body)
    const existingBank: (IBank | null) = await Bank.findOne({nickname: validatedBank.nickname})
    if (existingBank) return res.status(409).json({ message: "Bank with the same Nickname already exists." })

    const bank: IBank = await Bank.create(validatedBank)
    await bank.save()
    return res.status(200).json(bank)
})


router.put(`${baseURL}:id`, async(req: Request, res: Response): Promise<Response> => {
    const validatedBank: IBankInput = validate(req.body)
    const bank: (IBank | null) = await Bank.findByIdAndUpdate(req.params.id, validatedBank, {new: true})
    if (!bank) return res.status(404).json({ message: "Bank not found." })
    return res.sendStatus(204)
})


router.delete(`${baseURL}:id`, [MAuth, MAdmin], async (req: Request, res: Response): Promise<Response> => {
    const bank: (IBank | null) = await Bank.findByIdAndDelete(req.params.id)
    if (!bank) return res.status(404).json({ message: "Bank not found." })
    return res.sendStatus(204)
})

export default router