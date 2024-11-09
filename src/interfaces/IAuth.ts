import { Document, Types } from "mongoose"

export interface IAuth extends Document {
    readonly _id: Types.ObjectId
    email: string
    password: string
    username: string
    dateCreated: Date
}

export interface IAuthInput {
    email: string
    password: string
}