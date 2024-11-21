import { CustomerModel as Customer, validateCustomer as validate } from '../models/Customer'
import { Request, Response, Router } from 'express'
import { ICustomer, ICustomerInput } from '../interfaces/ICustomer'

const router = Router()
const baseURL = '/'

router.get(baseURL, async (_req: Request, res: Response): Promise<Response> => {
    const customers: ICustomer[] = await Customer.find().sort({ customerName: 1 }).lean<ICustomer[]>()
    return res.status(200).json(customers)
})

router.get(`${baseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const customer: (ICustomer | null) = await Customer.findById(req.params.id)
    return res.status(200).json(customer)
})

router.post(baseURL, async (req: Request, res: Response): Promise<Response> => {
    const validatedCustomer: ICustomerInput = validate(req.body)
    const existingCustomer: (ICustomer | null) = await Customer.findOne({ cnic: validatedCustomer.cnic })
    if (existingCustomer) return res.status(409).json({ message: "Customer with the same CNIC already exists." })

    const customer: ICustomer = await Customer.create(validatedCustomer)
    await customer.save()
    return res.status(201).json(customer)
})

router.put(`${baseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const customer: (ICustomerInput | null) = validate(req.body)
    if (!customer) return res.status(404).json({ message: "Customer not found." })
        await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true } )
    return res.sendStatus(204)
})

router.delete(`${baseURL}:id`, async (req: Request, res: Response): Promise<Response> => {
    const customer: (ICustomer | null) = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).json({ message: "Customer not found." })
    return res.sendStatus(204)
})

export default router
