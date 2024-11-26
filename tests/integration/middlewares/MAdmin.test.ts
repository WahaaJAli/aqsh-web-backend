import { Request, Response } from 'express'
import app from '../setup'
import config from '../../../src/config/Environment'
import jwt from 'jsonwebtoken'
import MAdmin from '../../../src/middlewares/MAdmin'
import MAuth from '../../../src/middlewares/MAuth'
import mongoose from 'mongoose'
import request from 'supertest'

const adminURL = '/admin'

app.get(adminURL, [MAuth, MAdmin], (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome, Admin!' })
})

describe('MAdmin Middleware Integration Tests', () => {
  let adminToken: string
  let userToken: string

  beforeAll(async () => {
    const adminPayload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true }
    adminToken = jwt.sign(adminPayload, config.JWT_KEY, { expiresIn: '1h' })

    const userPayload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: false }
    userToken = jwt.sign(userPayload, config.JWT_KEY, { expiresIn: '1h' })
  })

  it('should allow access if user is an admin', async () => {
    const { status, body } = await request(app).get(adminURL).set('X-Auth-Token', adminToken)
    expect(status).toBe(200)
    expect(body).toEqual({ message: 'Welcome, Admin!' })
  })

  it('should return 403 if user is not an admin', async () => {
    const { status, body } = await request(app).get(adminURL).set('X-Auth-Token', userToken)
    expect(status).toBe(403)
    expect(body).toEqual({ message: 'Access Forbidden: Admin privileges required.' })
  })

  it('should return 403 if no token is provided', async () => {
    const { status, body } = await request(app).get(adminURL)
    expect(status).toBe(403)
    expect(body).toEqual({ message: 'Access Forbidden: No token provided.' })
  })

  it('should return 403 if an invalid token is provided', async () => {
    const { status, body } = await request(app).get(adminURL).set('X-Auth-Token', 'invalid-token')
    expect(status).toBe(403)
    expect(body).toEqual({ message: 'Access Forbidden: Invalid or expired token.' })
  })

  it('should return 403 if token is expired', async () => {
    const expiredToken = jwt.sign(
      { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true },
      config.JWT_KEY,
      { expiresIn: '1ms' }
    )
    const { status, body } = await request(app).get(adminURL).set('X-Auth-Token', expiredToken)
    expect(status).toBe(403)
    expect(body).toEqual({ message: 'Access Forbidden: Invalid or expired token.' })
  })
})