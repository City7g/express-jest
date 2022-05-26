const request = require("supertest");
const app = require("../app");
const { v4: uuidv4 } = require('uuid');

const validUser = { "name": "Dima", "password": "123" }
const novalidLogin = { "name": "Some", "password": "123" }
const novalidPassword = { "name": "Dima", "password": "1234" }
const newUser = { "name": uuidv4(), "password": "newPassword" }

describe("Логин пользователя", () => {
  test("Логин пользователя с правильными данными", async () => {
    const data = await request(app).post('/auth/login').send(validUser)
    expect(data.text).toMatch(/^{.*}$/)
    expect(data.text).toMatch(/accessToken":"[\w-]{5,150}\.[\w-]{5,150}\.[\w-]{5,150}"/i)
    expect(data.text).toMatch(/"refreshToken":"[\w-]{5,150}\.[\w-]{5,150}\.[\w-]{5,150}"/i)
    expect(data.statusCode).toBe(200)
  });

  test("Логин пользователя с неверными логином", async () => {
    const data = await request(app).post('/auth/login').send(novalidLogin)
    expect(data.text).toBe('Такого пользователя нет')
    expect(data.statusCode).toBe(403)
  });
  
  test("Логин пользователя с неверными паролем", async () => {
    const data = await request(app).post('/auth/login').send(novalidPassword)
    expect(data.text).toBe('Такого пользователя нет')
    expect(data.statusCode).toBe(403)
  });
});

describe("Регистрация пользователя", () => {
  test("Регистрация пользователя с правильными данными", async () => {
    const data = await request(app).post('/auth/register').send(newUser)
    expect(data.text).toMatch(/^{.*}$/)
    expect(data.text).toMatch(/accessToken":"[\w-]{5,150}\.[\w-]{5,150}\.[\w-]{5,150}"/i)
    expect(data.text).toMatch(/"refreshToken":"[\w-]{5,150}\.[\w-]{5,150}\.[\w-]{5,150}"/i)
    expect(data.statusCode).toBe(200)
  });

  test("Регистрация существующего пользователя", async () => {
    const data = await request(app).post('/auth/register').send(validUser)
    expect(data.text).toBe('Такой пользователь существует')
    expect(data.statusCode).toBe(403)
  });
  
  test("Не введен логин", async () => {
    const data = await request(app).post('/auth/register').send({"password":"123"})
    expect(data.text).toBe('Введите значения имени')
    expect(data.statusCode).toBe(403)
  });

  test("Не введен пароль", async () => {
    const data = await request(app).post('/auth/register').send({"name":"Dima"})
    expect(data.text).toBe('Введите значения пароля')
    expect(data.statusCode).toBe(403)
  });
});