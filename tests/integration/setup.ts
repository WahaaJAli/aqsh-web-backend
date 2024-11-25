import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../../app'
import mongoose from 'mongoose'

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()

  await mongoose.connect(uri)
})

afterEach(async () => {
  const collections = await mongoose.connection.db?.collections()
  if (collections) {
    for (const collection of collections)
      await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongo.stop()
})

export default app