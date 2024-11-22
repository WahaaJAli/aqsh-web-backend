import request from 'supertest'
import app from '../app'

jest.mock("config", () => ({
  get: jest.fn((key) => {
    const config = {
      JWTPrivateKey: "test-private-key",
      DATABASE: "test-database-uri",
    }
    return config[key]
  }),
}))

describe('Test the root path', () => {
  it('should return 200 OK for the root route', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Welcome to the API')
  })
})