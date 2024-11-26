import app from "../setup"
import request from "supertest"

describe("Users Endpoint Integration Tests", () => {
  const usersEndpoint = "/users/"
  
  const userPayload = {
    username: "testuser",
    email: "testuser@example.com",
    password: "Test@1234",
    isAdmin: false,
  }

  const adminPayload = {
    username: "adminuser",
    email: "admin@example.com",
    password: "Admin@1234",
    isAdmin: true,
  }

  it("POST / - Should create a new user and return 201", async () => {
    const { status, body } = await request(app).post(usersEndpoint).send(userPayload)
    expect(status).toBe(201)
    expect(body).toHaveProperty("_id")
    expect(body).toHaveProperty("email", userPayload.email)
  })

  it("POST / - Should not allow duplicate email registration", async () => {
    await request(app).post(usersEndpoint).send(userPayload)

    const { body, status } = await request(app).post(usersEndpoint).send(userPayload)
    expect(status).toBe(409)
    expect(body).toHaveProperty("message", "User with the same email already Registered.")
  })

  it("GET / - Should retrieve all users", async () => {
    await request(app).post(usersEndpoint).send(userPayload)

    const { status, body: {users} } = await request(app).get(usersEndpoint)
    expect(status).toBe(200)
    expect(users).toHaveLength(1)
    expect(users[0]).toHaveProperty("email", userPayload.email)
  })

  it("GET /me - Should retrieve the logged-in user", async () => {
    const { headers } = await request(app).post(usersEndpoint).send(adminPayload)
    const { "x-auth-token": token } = headers
    const { status, body: {user} } = await request(app).get(`${usersEndpoint}me`).set("X-Auth-Token", token)
    
    expect(status).toBe(200)
    expect(user).toHaveProperty("email", adminPayload.email)
  })

  it("PUT /:id - Should update user details", async () => {
    const userResponse = await request(app).post(usersEndpoint).send(userPayload)
    const { _id } = userResponse.body

    const updatedData = { ...userPayload, username: "updatedUser" }
    const { status } = await request(app).put(`${usersEndpoint}${_id}`).send(updatedData)
    expect(status).toBe(204)

    const { body: { users } } = await request(app).get(usersEndpoint)
    expect(users[0]).toHaveProperty("username", "updatedUser")
  })

  it("DELETE /:id - Should delete a user", async () => {
    const userResponse = await request(app).post(usersEndpoint).send(userPayload)
    const { _id } = userResponse.body

    const { status } = await request(app).delete(`${usersEndpoint}${_id}`)
    expect(status).toBe(204)

    const { body: { users } } = await request(app).get(usersEndpoint)
    expect(users).toHaveLength(0)
  })
})