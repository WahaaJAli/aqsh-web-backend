import { bankName, bankNickname as nickname, customerName, dateCreated, username } from "../schemas/CommonSchema"
import mongoose, { Schema } from "mongoose"
import { z } from "zod"
import ICustomer, { IBank_Customers } from "../interfaces/ICustomer"

const BankSchema: Schema<IBank_Customers> = new Schema({ bankName, nickname })

const CustomerSchema: Schema<ICustomer> = new Schema({
    // bank: {
    //     // Referencing
    //     type: Schema.Types.ObjectId,
    //     ref: 'bank',
    //     default: null,
    //     required: false,
    // },
    banks: {
        type: [BankSchema],
        default: null,
    },
    cnic: {
        type: String,
        length: 15,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        get: (value: string) => { return value },
        set: (value: string) => { return value },
        trim: true,
        validate: {
            validator: function(value: string) { return /^\d{11}$/.test(value) },
            message: (props: { value: string }) => `${props.value} is not a valid phone number!`
        },
    },
    customerName,
    dateCreated,
    username
})

const CustomerModel = mongoose.model<ICustomer>('Customer', CustomerSchema)

const validateCustomer = (customer: ICustomer) => {
    const customerSchema = z.object({
        cnic:         z.string().length(15), // Including dashes
        customerName: z.string().min(4).max(40),
        phone:        z.string().length(11),
        username:     z.string().min(4).max(40),
    });

    return customerSchema.parse(customer)
}

export { CustomerSchema, CustomerModel as Customer, validateCustomer as validate }