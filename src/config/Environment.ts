import dotenv from 'dotenv'
import path from 'path'

// Load the .env file based on the environment (default to 'development')
const ENV = process.env.ENVIRONMENT || 'development'
dotenv.config({ path: path.resolve(__dirname, `../../.env.${ENV}`) })

const REQUIRED_VARS = ['DATABASE_CONNECTION', 'JWT_PRIVATE_KEY', 'PORT']

const validateEnv = () => {
  const missing = REQUIRED_VARS.filter(key => !process.env[key])
  if (missing.length) {
    console.error(`Missing environment variables: ${missing.join(', ')}`)
    process.exit(1)
  }
}
validateEnv()

const config = {
  CLIENT: process.env.CLIENT!,
  DATABASE: process.env.DATABASE_CONNECTION!,
  DEBUG: process.env.DEBUG!,
  ENVIRONMENT: ENV!,
  JWT_KEY: process.env.JWT_PRIVATE_KEY!,
  LOG_LEVEL: process.env.LOG_LEVEL!,
  PORT: Number(process.env.PORT!)
}

export default config