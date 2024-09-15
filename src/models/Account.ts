import { z } from "zod"
import IAccount from "../interfaces/IAccount"
import mongoose from "mongoose"

const AccountSchema = new mongoose.Schema({
    accountTitle: {
        type: String,
        min: 3,
        max: 35,
        required: true,
        trim: true,
    },
    accountId: {
        type: Number,
        max: 19,
        min: 15,
        required: true
    },
    accountType: {
        type: String,
        min: 3,
        max: 50,
        required: true,
        trim: true,
    },
    balance: {
        type: Number,
        max: 10,
        required: true,
        trim: true,
    },
    bank: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 10,
                maxlength: 40,
                required: true,
            }
        }),
        required: true,
    },
    bic: {
        type: String,
        min: 8,
        max: 11,
        required: true,
        uppercase: true,
    },
    city: {
        type: String,
        min: 4,
        max: 20,
        required: true,
        trim: true,
    },
    currency: {
        type: String,
        default: 'PKR',
        length: 3,
        required: true,
        uppercase: true,
    },
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 10,
                maxlength: 40,
                required: true,
            },
            username: {
                type: String,
                minlength: 10,
                maxlength: 40,
                required: true,
            }
        }),
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    iban: {
        type: String,
        length: 24,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    }
})

const AccountModel = mongoose.model<IAccount>('account', AccountSchema)

const validateAccount = (account: IAccount) => {
    const accountSchema = z.object({
        accountTitle: z.string().min(3).max(35),
        accountType:  z.string().min(3).max(50),
        balance:      z.number().max(9_999_999_999),
        bank:         z.string().uuid(),
        city:         z.string().min(4).max(20),
        customer:     z.string().uuid()
    })

    return accountSchema.parse(account)
}

export { AccountSchema, AccountModel as Account, validateAccount as validate }