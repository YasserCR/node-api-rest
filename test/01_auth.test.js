const request = require("supertest");
const app = require('../app');

const testAuthLogin = {
    email: "testtest1234345544121212@gmail.com",
    password: "Juanchacal12"

}

const testAuthRegister = {
    name: "Tester",
    age: 0,
    email: "testtest12661211212@gmail.com",
    password: "Juanchacal12"

}

describe("[AUTH] first api/auth test", () => {
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

});

