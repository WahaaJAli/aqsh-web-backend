import { emailSchema, passwordSchema } from "../schemas/CommonZodSchema"
import { IAuthInput } from "../interfaces/IAuth"
import { z } from "zod"

const validateUser = (user: IAuthInput): IAuthInput => {
    const authSchema = z.object({
        email: emailSchema,
        password: passwordSchema
    })
    return authSchema.parse(user)
}

export {validateUser}