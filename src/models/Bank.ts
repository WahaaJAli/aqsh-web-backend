import { z } from "zod"
import IBank from "../interfaces/IBank"
import mongoose from "mongoose"

const BankSchema = new mongoose.Schema({
    bic: {
        type: String,
        maxlength: 11,
        minlength: 8,
        required: true,
        trim: true,
        uppercase: true,
    },
    customers: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 10,
                maxlength: 40,
                required: true,
                trim: true,
            }
        }),
        default: null,
    },
    customersCount: {
        type: Number,
        get: (value: number) => Math.round(value),
        set: (value: number) => Math.round(value),
        default: 0,
    },
    dateCreated: { 
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        minlength: 8,
        maxlength: 40,
        required: true,
        trim: true,
        validate: {
            validator: function(value: string) { return /^[a-zA-Z\s]+$/.test(value) },
            message: (props: { value: string }) => `${props.value} is not a valid bank name!`
        },
    },
    nickName: {
        type: String,
        length: 4,
        required: true,
        trim: true,
        uppercase: true
    }
})

const BankModel = mongoose.model<IBank>('bank', BankSchema)

const validateBank = (bank: IBank) => {
    const bankSchema = z.object({
        bic:       z.string().min(8).max(11).transform(val => val.toUpperCase()),
        name:      z.string().min(8).max(40).regex(/^[a-zA-Z\s]+$/, { message: `Please provide a bank without special characters or numbers.` }),
        nickName:  z.string().length(4).refine(val => val = val.toUpperCase())
    })

    return bankSchema.parse(bank)
}

export { BankSchema, BankModel as Bank, validateBank as validate }