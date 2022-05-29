const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../model/user')
const { list: listUsers, find: findUser, add: createUser } = require('../../service/user')
const isAdmin = require('../../middleware/isAdmin')

router.get('/login', (req, res) => {
  res.status(200).send('/auth/login')
  // res.render('login', { error: req.flash('error') })
})

router.post('/login', async (req, res) => {
  if (req.body.name && req.body.password) {
    const user = await findUser({ name: req.body.name });
    if (!user) return res.status(403).send('Такого пользователя нет')
    const hashPassword = await bcrypt.compare(req.body.password, user.password)
    if(!hashPassword) return res.status(403).send('Неверный пароль')
      // req.flash('error', 'Такого пользователя нет')
      // return res.redirect('/auth/login')

    const accessToken = jwt.sign({ user: user.id }, process.env.JWT_SECRET_KEY)
    const refreshToken = jwt.sign({ foo: user.id }, process.env.JWT_SECRET_KEY)

    return res.status(200).json({ user, accessToken, refreshToken })
  }
  // res.status(403).send('Auth error')
  // req.flash('error', 'Введите данные')
  res.status(404).send('Проблемы')
})

router.post('/register', async (req, res) => {
  if (!req.body.name) return res.status(403).send('Введите значения имени')
  if (!req.body.password) return res.status(403).send('Введите значения пароля')

  const userName = await User.findOne({ where: { name: req.body.name } })
  if (userName) {
    return res.status(403).send('Такой пользователь существует')
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10)
  const user = await createUser({ name: req.body.name, password: hashPassword });
  const accessToken = jwt.sign({ user: user.id }, 'SECRET')
  const refreshToken = jwt.sign({ foo: user.id }, 'SECRET')
  res.status(200).json({ user, accessToken, refreshToken })
})

module.exports = router;
