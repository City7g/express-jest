const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../../model/user')
const isAdmin = require('../../middleware/isAdmin')

router.get('/users', isAdmin, async (req, res) => {
  const { user } = jwt.verify(req.headers.authorization.replace(/Bearer /, ''), process.env.JWT_SECRET_KEY)
  const users = await User.findAll();
  res.status(200).json(users)
})

router.post('/login', async (req, res) => {
  if (req.body.name && req.body.password) {
    const user = await User.findOne({ where: { name: req.body.name, password: req.body.password } });
    if (!user) return res.status(403).send('Такого пользователя нет')

    const accessToken = jwt.sign({ user: user.id }, process.env.JWT_SECRET_KEY)
    const refreshToken = jwt.sign({ foo: user.id }, process.env.JWT_SECRET_KEY)

    return res.status(200).json({ user, accessToken, refreshToken })
  }
  res.status(403).send('Auth error')
})

router.post('/register', async (req, res) => {
  if (!req.body.name) return res.status(403).send('Введите значения имени')
  if (!req.body.password) return res.status(403).send('Введите значения пароля')

  const userName = await User.findOne({ where: { name: req.body.name } })
  if (userName) {
    return res.status(403).send('Такой пользователь существует')
  }

  const user = await User.create({ name: req.body.name, password: req.body.password });
  const accessToken = jwt.sign({ user: user.id }, 'SECRET')
  const refreshToken = jwt.sign({ foo: user.id }, 'SECRET')
  res.status(200).json({ user, accessToken, refreshToken })
})

module.exports = router;
