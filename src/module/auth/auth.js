const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../model/user')
const { list: listUsers, find: findUser } = require('../../service/user')
const isAdmin = require('../../middleware/isAdmin')

router.get('/users', isAdmin, async (req, res) => {
  const users = await listUsers();
  res.status(200).json({ users })
  // res.status(200).render('index', { users })
})

router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error') })
})

router.post('/login', async (req, res) => {
  // console.log(req.fields
  if (req.body.name && req.body.password) {
    // const hashPassword = await bcrypt.hash(req.body.password, 10)
    // const user = await User.findOne({ where: { name: req.body.name, password: hashPassword } });
    const user = await findUser({ name: req.body.name, password: req.body.password });
    if (!user) {
      req.flash('error', 'Такого пользователя нет')
      return res.redirect('/auth/login')
      return res.status(403).send('Такого пользователя нет')
    }

    const accessToken = jwt.sign({ user: user.id }, process.env.JWT_SECRET_KEY)
    const refreshToken = jwt.sign({ foo: user.id }, process.env.JWT_SECRET_KEY)

    return res.status(200).json({ user, accessToken, refreshToken })
  }
  // res.status(403).send('Auth error')
  req.flash('error', 'Введите данные')
  return res.redirect('/auth/login')
})

router.post('/register', async (req, res) => {
  if (!req.body.name) return res.status(403).send('Введите значения имени')
  if (!req.body.password) return res.status(403).send('Введите значения пароля')

  const userName = await User.findOne({ where: { name: req.body.name } })
  if (userName) {
    return res.status(403).send('Такой пользователь существует')
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10)
  const user = await User.create({ name: req.body.name, password: hashPassword });
  const accessToken = jwt.sign({ user: user.id }, 'SECRET')
  const refreshToken = jwt.sign({ foo: user.id }, 'SECRET')
  res.status(200).json({ user, accessToken, refreshToken })
})

module.exports = router;
