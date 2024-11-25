import { emailSchema, passwordSchema } from "../../src/schemas/CommonZodSchema"

describe("commonZodSchemas", () => {
  describe("emailSchema", () => {
    it("should pass for valid email addresses", () => {
      const result = emailSchema.safeParse("Test@ExAMple.cOm             ")
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe("test@example.com")
      }
    })

    it("should fail for invalid email addresses", () => {
      const result = emailSchema.safeParse("invalid-email")
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Invalid email address")
      }
    })
  })

  describe("passwordSchema", () => {
    it("should pass for a valid password", () => {
      const result = passwordSchema.safeParse("Valid123!")
      expect(result.success).toBe(true)
    })

    it("should fail for a password less than 8 characters", () => {
      const result = passwordSchema.safeParse("Short1!")
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Password must be at least 8 characters long")
      }
    })

    it("should fail for a password without an uppercase letter", () => {
      const result = passwordSchema.safeParse("valid123!")
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Password must contain at least one uppercase letter")
      }
    })

    it("should fail for a password without a lowercase letter", () => {
      const result = passwordSchema.safeParse("VALID123!")
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Password must contain at least one lowercase letter")
      }
    })

    it("should fail for a password without a number", () => {
      const result = passwordSchema.safeParse("ValidPass!")
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Password must contain at least one number")
      }
    })

    it("should fail for a password without a special character", () => {
      const result = passwordSchema.safeParse("Valid1234")
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Password must contain at least one special character")
      }
    })

    it("should fail for a password exceeding 255 characters", () => {
      const longPassword = `${'A'.repeat(256)}1!`
      const result = passwordSchema.safeParse(longPassword)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Password should not contain more than 255 characters")
      }
    })
  })
})