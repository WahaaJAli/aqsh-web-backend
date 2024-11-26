import { CustomerModel as Customer, validateCustomer as validate } from '../models/Customer'
import { Request, Response, Router } from 'express'
import { ICustomer, ICustomerInput } from '../interfaces/ICustomer'
import { ZodError } from 'zod'

const router = Router()
const baseURL = '/'

router.get(baseURL, async (req: Request, res: Response) => {
    await Customer.find().sort({name: 1}).lean()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(404).json(error))
})


router.get(`${baseURL}:id`, async (req: Request, res: Response) => {
    await Customer.findById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(404).json(error))
})


router.post(baseURL, async (req: Request, res: Response) => {
    try {
        validate(req.body)
        const existingCustomer: (ICustomer | null) = await Customer.findOne({cnic: req.body.cnic})
        if (existingCustomer) return res.status(409).json({ message: "Customer with the same CNIC already exists." })
        
        const customer: ICustomer = await Customer.create(req.body)
        await customer.save()
        return res.status(201).json(customer)
    }
    catch (error) {
        if (error instanceof ZodError) return res.status(422).json(error)
        else return res.status(404).json(error)
    }
})


router.put(`${baseURL}:id`, async (req: Request, res: Response) => {
    try {
        validate(req.body)
        await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.sendStatus(204)
    }
    catch (error) {
        if (error instanceof ZodError) return res.status(422).json(error)
        else return res.status(404).json(error)
    }
})


router.delete(`${baseURL}:id`, async (req: Request, res: Response) => {
    try {
        await Customer.findByIdAndDelete(req.params.id)
        return res.sendStatus(204)
    }
    catch (error) {
        return res.status(404).json(error)
    }
})

export default router 
