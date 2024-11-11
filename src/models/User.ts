import { dateCreated, email, isAdmin, password, username } from "../schemas/CommonMongoDbSchema"
import { emailSchema, passwordSchema } from "../schemas/CommonZodSchema"
import { IUser, IUserInput } from "../interfaces/IUser"
import { z } from "zod"
import config from 'config'
import jwt from 'jsonwebtoken'
import mongoose, { Schema } from "mongoose"

const UserSchema: Schema<IUser> = new Schema<IUser>({ username, email, password, dateCreated, isAdmin })

UserSchema.methods.generateAuthToken = function (): string {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get<string>('JWTPrivateKey'), { expiresIn: '5m' });
}

const UserModal = mongoose.model<IUser>('User', UserSchema)

const validateUser = (user: IUserInput): IUserInput => {
    const userSchema = z.object({
        username: z.string().trim().min(8).max(40),
        email: emailSchema,
        password: passwordSchema
    })
    return userSchema.parse(user)
}

export {UserSchema, UserModal, validateUser}