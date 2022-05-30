const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { listUsers, findUser, findUserById, createUser, updateUser, deleteUser } = require('../service/user')

const sendResponceWithToken = (user) => {
  const accessToken = jwt.sign({ user: user.id }, process.env.JWT_SECRET_KEY)
  const refreshToken = jwt.sign({ foo: user.id }, process.env.JWT_SECRET_KEY)

  return { user, accessToken, refreshToken }
}

router.post('/login', async (req, res) => {
  const user = await findUser({ name: req.body.name })
  if (!user) return res.status(404).send('Такого пользователя не существует')

  const isTruthPassword = await bcrypt.compare(req.body.password, user.password)
  if (!isTruthPassword) return res.status(404).send('Логин или пароль неверный')

  res.status(200).send(sendResponceWithToken(user))
})

router.post('/register', async (req, res) => {
  try {
    const newUser = await createUser({ name: req.body.name, password: req.body.password })
    res.status(200).send(sendResponceWithToken(newUser))
  } catch (err) {
    res.status(404).send(err)
  }
})

module.exports = router;