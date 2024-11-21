import { Date, Document, Types } from "mongoose";
import { IBank } from "./IBank";
import { ICustomer } from "./ICustomer";

export interface IAccount extends Document {
    _id: Types.ObjectId
    accountId: number
    accountTitle: string
    accountType: string
    balance: number
    bank: IBank
    bic: string
    city: string
    currency: string
    customer: ICustomer
    dateCreated: Date
    iban: number
    isActive: boolean
}