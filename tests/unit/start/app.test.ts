import request from 'supertest'
import app from '../../../src/start/app'

describe('Test the root path', () => {
  it('should return 200 OK for the root route', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})