const express = require('express')
const router = express.Router()
const session = require('express-session')
const flash = require('connect-flash')
const csrf = require('csurf')
const varMiddleware = require('../../middleware/variables')

router.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
router.use(csrf())
router.use(flash())
router.use(varMiddleware)

router.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})

router.get('/', (req, res) => {
  res.status(200).render('index')
})

router.get('/login', (req, res) => {
  res.status(200).render('login')
})

router.post('/login', (req, res) => {
  if (req.body.name === 'Dima' && req.body.password === '123') {
    req.session.isAuthenticated = true
    return res.status(200).redirect('/')
  }
  if(req.body.name !== 'Dima') {
    req.flash('error', 'Такого пользователя нет')
    return res.status(403).render('login', {
      error: req.flash('error'),
      oldName: req.body.name
    })
  }
  req.flash('error', 'Введите корректные данные')
  res.status(403).render('login', {
    error: req.flash('error')
  })
})

router.get('/logout', (req, res) => {
  req.session.isAuthenticated = false
  req.session.save(err => {
    if(err) {
      throw err
    }
    res.redirect('/')
  })
})

module.exports = router