const request = require("supertest");
const app = require("../../app");

describe("Comprobando login", () => {
  test("login", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ mail: "carlos@gmail.com", password: "1234" });
    expect(response.statusCode).toBe(200);
  });
});
