import { Date, Document, Types } from "mongoose"
import IBank from "./IBank"
export default interface ICustomer extends Document {
    _id: Types.ObjectId
    banks: Omit<IBank, 'customers'>[] | null
    cnic: string
    dateCreated: Date
    name: string
    phone: string
    username: string
}