const request = require("supertest");
const app = require("../../app");
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid');

// const validUser = { "name": "Dima", "password": "123" }
// const novalidLogin = { "name": "Some", "password": "123" }
// const novalidPassword = { "name": "Dima", "password": "1234" }
// const newUser = { "name": uuidv4(), "password": "newPassword" }

const newUserLogin = uuidv4();
let newUserId = null;

describe("Получение пользователей", () => {
  test("Получить список всех пользователей", async () => {
    const data = await request(app).get('/api/users')
    const json = JSON.parse(data.text)
    expect(_.isArray(json.users)).toBeTruthy()
    expect(typeof +json.length).toBe('number')
    expect(data.statusCode).toBe(200)
  });

  test("Получить данные первого пользователя", async () => {
    const data = await request(app).get('/api/users/2')
    const json = JSON.parse(data.text)
    expect(_.isObject(json)).toBeTruthy()
    expect(data.statusCode).toBe(200)
  });

  test("Получить данные несуществующего пользователя", async () => {
    const data = await request(app).get('/api/users/2150')
    expect(data.text).toBe('Такого пользователя нет')
    expect(data.statusCode).toBe(404)
  });

  // test("Логин пользователя с неверными паролем", async () => {
  //   const data = await request(app).post('/auth/login').send(novalidPassword)
  //   expect(data.text).toBe('Такого пользователя нет')
  //   expect(data.statusCode).toBe(403)
  // });
});

describe("Создание пользователя", () => {
  test("Создание нового пользователя", async () => {
    const data = await request(app).post('/api/users').send({ name: newUserLogin, password: '123' })
    const json = JSON.parse(data.text)
    expect(_.isObject(json)).toBeTruthy()
    expect(data.statusCode).toBe(201)
    newUserId = json.user.id
  });

  test("Создание существующего пользователя", async () => {
    const data = await request(app).post('/api/users').send({ name: newUserLogin, password: '123' })
    expect(data.text).toBe('Такой пользователь уже существует')
    expect(data.statusCode).toBe(404)
  });
});

describe("Обновление данных о пользователе", () => {
  test("Обновление имени у существущего пользователя", async () => {
    const data = await request(app).put(`/api/users/${newUserId}`).send({ name: 'Dima' })
    expect(data.text).toBe('Пользователь успешно обновлен')
    expect(data.statusCode).toBe(200)
  });

  test("Создание существующего пользователя", async () => {
    const data = await request(app).put('/api/users/1111111').send({ name: 'Dima' })
    expect(data.text).toBe('Такой пользователя не существует')
    expect(data.statusCode).toBe(404)
  });
});

describe("Удаление пользователя", () => {
  test("Удаление созданного пользователя", async () => {
    const data = await request(app).delete(`/api/users/${newUserId}`)
    expect(data.text).toBe('Пользователь успешно удален')
    expect(data.statusCode).toBe(200)
  });

  test("Удаление не существующего пользователя", async () => {
    const data = await request(app).delete(`/api/users/${newUserId}`)
    expect(data.text).toBe('Такой пользователя не существует')
    expect(data.statusCode).toBe(404)
  });
});