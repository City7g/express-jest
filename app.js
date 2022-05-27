const express = require("express");
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
const session = require('express-session')
const flash = require('connect-flash')
const csurf = require('csurf')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./src/graphql/schema')
const resolver = require('./src/graphql/resolver')

const authModule = require('./src/module/auth/auth')
const varMiddleware = require('./src/middleware/variables')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(graphqlHTTP({
//   schema: schema,
//   rootValue: resolver,
//   graphiql: true
// }))

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   // cookie: { secure: true }
// }))

// app.use(csurf())

app.set('view engine', 'pug');
app.set('views', './src/views')

// app.use(varMiddleware)
app.use(flash())

app.get('/', function (req, res, next) {
  console.log(req.session)
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.get("/user", (req, res) => {
  res.status(201).json({ user: '1' })
})

app.use('/auth', authModule)

module.exports = app;