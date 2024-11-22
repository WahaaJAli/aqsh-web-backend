import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

jest.spyOn(process, "exit").mockImplementation(code => {
    throw new Error(`process.exit called with code ${code}`)
})