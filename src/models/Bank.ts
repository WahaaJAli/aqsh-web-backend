import { bankName, bankNickname as nickname, customerName, dateCreated, username } from "../schemas/CommonSchema"
import mongoose, { Schema } from "mongoose"
import { z } from "zod"
import IBank, { ICustomer_Bank } from "../interfaces/IBank"

const CustomerSchema: Schema<ICustomer_Bank> = new Schema({customerName, username})

const BankSchema: Schema<IBank> = new Schema({
    bic: {
        type: String,
        minlength: 8,
        maxlength: 11,
        // match: /PKKA$/,
        required: true,
        trim: true,
        uppercase: true,
    },
    customers: {
        type: [CustomerSchema],
        default: [],
    },
    bankName,
    dateCreated,
    nickname,
})

const BankModel = mongoose.model<IBank>('Bank', BankSchema)

const validateBank = (bank: IBank) => {
    const bankSchema = z.object({
        bic: z.string().min(8).max(11).transform(val => val.toUpperCase()),
        bankName: z.string().min(8).max(50).regex(/^[a-zA-Z\s]+$/, { message: `Please provide a bank without special characters or numbers.` }),
        nickname: z.string().length(4).refine(val => val = val.toUpperCase())
    })

    return bankSchema.parse(bank)
}

export { BankSchema, BankModel as Bank, validateBank as validate }