import { dateCreated, email, password, username } from "../schemas/CommonMongoDbSchema"
import { IUser, IUserInput } from "../interfaces/IUser"
import { emailSchema, passwordSchema } from "../schemas/CommonZodSchema"
import { z } from "zod"
import mongoose, { Schema } from "mongoose"

const UserSchema: Schema<IUser> = new Schema<IUser>({ username, email, password, dateCreated })
const UserModal = mongoose.model<IUser>('User', UserSchema)

const validateUser = (user: IUserInput): IUserInput => {
    const userSchema = z.object({
        username: z.string().trim().min(8).max(40),
        email: emailSchema,
        password: passwordSchema
        // password: z.string().regex(passwordRegex, 'Password must be at least 8 characters long, include uppercase and lowercase letters, at least one digit, and one special character.')
    })
    return userSchema.parse(user)
}

export {UserSchema, UserModal, validateUser}