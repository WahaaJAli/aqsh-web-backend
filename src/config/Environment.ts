const DATABASE_PASSWORD = process.env.AQSH_DB_PASSWORD || ''
const DATABASE = process.env.DATABASE_CONNECTION?.replace('<password>', DATABASE_PASSWORD) || ''
const DEBUG = process.env.DEBUG || ''
const JWT_KEY = process.env.JWT_PRIVATE_KEY || ''
const ENVIRONMENT = process.env.ENVIRONMENT || 'development'
const PORT = Number(process.env.PORT) || 2123

if (!JWT_KEY) {
  console.error('Error: Missing JWTPrivateKey in environment variables.')
  process.exit(1)
}

export { DATABASE, PORT, ENVIRONMENT, JWT_KEY, DEBUG }