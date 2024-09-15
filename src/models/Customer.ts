import { z } from "zod"
import ICustomer from "../interfaces/ICustomer"
import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema({
    // bank: {
    //     // Referencing
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'bank',
    //     default: null,
    //     required: false,
    // },
    accountsCount: {
        type: Number,
        get: (value: number) => Math.round(value),
        set: (value: number) => Math.round(value),
        default: 0,
    },
    bank: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 10,
                maxlength: 40,
                validate: {
                    validator: function(value: string) { return /^[a-zA-Z\s]+$/.test(value) },
                    message: (props: { value: string }) => `${props.value} is not a valid bank name!`
                },
                required: true,
            }
        }),
        default: null,
    },
    cnic: {
        type: String,
        length: 15,
        required: true,
        trim: true,
    },
    dateCreated: { 
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        minlength: 4,
        maxlength: 40,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        validate: {
            validator: function(value: string) { return /^\d{11}$/.test(value) },
            message: (props: { value: string }) => `${props.value} is not a valid phone number!`
        },
        set: (value: string) => { return `03${value}` },
        required: true,
        trim: true,
    },
    username: {
        type: String,
        minlength: 4,
        maxlength: 40,
        required: true,
        trim: true,
    }
})

const CustomerModel = mongoose.model<ICustomer>('customer', CustomerSchema)

const validateCustomer = (customer: ICustomer) => {
    const customerSchema = z.object({
        cnic:     z.string().length(15),
        name:     z.string().min(4).max(40),
        phone:    z.string().length(9),
        username: z.string().min(4).max(40),
    });

    return customerSchema.parse(customer)
}

export { CustomerSchema, CustomerModel as Customer, validateCustomer as validate }