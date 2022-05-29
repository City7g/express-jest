const express = require('express');
const router = express.Router();
const { listUsers, findUser, findUserById, createUser, updateUser } = require('../service/user')

router.get('/', async (req, res) => {
  const users = await listUsers()
  res.status(200).json({ users, count: users.length })
})

router.get('/:id', async (req, res) => {
  const user = await findUserById(+req.params.id)
  if (user) return res.status(200).json({ user })
  res.status(404).send('Такого пользователя нет')
})

router.post('/', async (req, res) => {
  const { name, password } = req.body
  const candidate = await findUser({ name })
  if (candidate) return res.status(404).send('Такой пользователь уже существует')
  const user = await createUser({ name, password })
  res.status(200).json({ user })
})

router.put('/:id', async (req, res) => {
  const candidate = await findUserById(+req.params.id)
  if (!candidate) return res.status(404).send('Такой пользователя не существует')
  const some = await updateUser(req.params.id, req.body)
  res.status(200).send('Пользователь успешно обновлен')
})

module.exports = router;