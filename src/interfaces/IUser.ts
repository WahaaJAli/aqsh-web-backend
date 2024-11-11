import { Document, Types } from "mongoose"

export interface IUser extends Document {
    readonly _id: Types.ObjectId
    email: string
    isAdmin: boolean
    password: string
    username: string
    dateCreated: Date
    generateAuthToken(): string
}

export interface IUserInput {
    email: string
    password: string
    username: string
}