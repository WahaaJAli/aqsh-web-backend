import { z } from "zod";
import { specialCharRegex } from "../validators/REGEXP";

const emailSchema = z.string().transform(v => v.trim().toLowerCase())
    .refine(v => z.string().email().safeParse(v).success, { message: "Invalid email address"})

const passwordSchema = z.string().trim().min(8,  "Password must be at least 8 characters long")
    .max(255,  "Password should not contain more than 255 characters")
    .refine(value => /[A-Z]/.test(value), "Password must contain at least one uppercase letter")
    .refine(value => /[a-z]/.test(value), "Password must contain at least one lowercase letter")
    .refine(value => /\d/.test(value),    "Password must contain at least one number")
    .refine(value => specialCharRegex.test(value), "Password must contain at least one special character")

export { emailSchema, passwordSchema }