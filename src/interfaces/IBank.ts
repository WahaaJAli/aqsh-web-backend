import { Date, Document, Types } from "mongoose"
import ICustomer from "./ICustomer"

export default interface IBank extends Document {
    readonly _id: Types.ObjectId
    bic: string
    customers: Omit<ICustomer, 'banks'>[] | null
    customersCount: number
    dateCreated: Date
    name: string
    nickName: string
}