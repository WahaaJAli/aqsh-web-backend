import { Date, Document, Types } from "mongoose"
import IBank from "./IBank"

export type IBank_Customers = Readonly<Pick<IBank, 'bankName' | 'nickname'>>
export default interface ICustomer extends Document {
    _id: Types.ObjectId
    banks: IBank_Customers[] | null
    cnic: string
    dateCreated: Date
    customerName: string
    phone: string
    username: string
}