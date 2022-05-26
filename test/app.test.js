const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("Возвращает 200 ответ на index", async () => {
    const data = await request(app).get('/')
    expect(data.statusCode).toBe(200)
  });

  test("При загрузки пользователей отправляет обьект пользователя", async () => {
    const data = await request(app).get('/user')
    // const json = await JSON.parse(data)
    expect(data.text).toMatch('"user":"1"')
  });

  test("При загрузки не существующих присылает ошибку", async () => {
    const data = await request(app).get('/some')
    expect(data.statusCode).toBe(404)
  });
});