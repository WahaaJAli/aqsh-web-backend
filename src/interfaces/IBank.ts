import { Date, Document, Types } from "mongoose"
import ICustomer from "./ICustomer"

export type ICustomer_Bank = Readonly<Pick<ICustomer, 'customerName' | 'username'>>
export default interface IBank extends Document {
    readonly _id: Types.ObjectId
    bic: string
    customers: ICustomer_Bank[] | null
    dateCreated: Date
    bankName: string
    nickname: string
}