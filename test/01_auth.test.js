const request = require("supertest");
const app = require('../app');
const { userModel } = require('../models');
const { testAuthLogin, testAuthRegister } = require("./helper/data.helper");

beforeAll(async () => {
    await userModel.deleteMany();
})

test("It will return a 404 status code", async () => {
    const response = await request(app)
        .post('/api/auth/login')
        .send(testAuthLogin)
    expect(response.statusCode).toEqual(404);
})

test("It will return a 201 status code", async () => {
    const response = await request(app)
        .post('/api/auth/register')
        .send(testAuthRegister)
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("data.token");
    expect(response.body).toHaveProperty("data.user");
})

test("It will return a 401 status code", async () => {
    const newTestAuthLogin = { ...testAuthLogin, password: "22222222" }
    const response = await request(app)
        .post("/api/auth/login")
        .send(newTestAuthLogin);

    expect(response.statusCode).toEqual(401);
})

test("It will return a 200 status code", async () => {
    const response = await request(app)
        .post("/api/auth/login")
        .send(testAuthRegister);

    expect(response.statusCode).toEqual(200);
})
