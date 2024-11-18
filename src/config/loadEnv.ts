import dotenv from 'dotenv'
import path from 'path'
import logger from '../utils/logger'

// Load .env file based on the environment (development/production)
const envPath = `.env.${process.env.ENVIRONMENT || 'development'}`
const result = dotenv.config({ path: path.resolve(__dirname, '../../', envPath) })

if (result.error) {
  logger.error('Error loading .env file:', result.error)
  process.exit(1)
}

const variables = ['DATABASE_CONNECTION', 'DEBUG', 'ENVIRONMENT', 'JWT_PRIVATE_KEY', 'PORT']

const validate = () => {
    const missingVars = variables.filter((variable) => !process.env[variable])
    if (missingVars.length > 0) {
        logger.error(`Missing environment variables: ${missingVars.join(', ')}`)
        process.exit(1)
    }
}
validate()