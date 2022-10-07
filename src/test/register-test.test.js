const request = require("supertest");
const app = require("../../app");

describe("Comprobando registro", () => {
  test("registro", async () => {
    const response = await request(app)
      .post("/auth/registro")
      .send({ mail: "messi@gmail.com", name: "lucas", password: "12345" });
    expect(response.statusCode).toBe(200);
  });
});
