import { Document, Types } from "mongoose"

export interface IUser extends Document {
    readonly _id: Types.ObjectId
    email: string
    password: string
    username: string
    dateCreated: Date
}

export interface IUserInput {
    email: string
    password: string
    username: string
}