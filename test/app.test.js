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

  test("При загрузки users грузит страницу", async () => {
    const data = await request(app).get('/auth/users').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxNSwiaWF0IjoxNjUzNjQ3MDUyfQ.tpBy1F9aAUWlIPNDzm0lubZaKEcFpQ5xhN4HpTeM6SU')
    expect(data.statusCode).toBe(200)
    expect(data.text).toMatch(/html/)
  });
});