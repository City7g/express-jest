const express = require("express");
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()

const staticRouter = require('./backend/router/static/index')
const authModule = require('./backend/module/auth/auth')
const userModule = require('./backend/module/user/user')
const apiModule = require('./backend/restapi/index')
const graphqlModule = require('./backend/graphql/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', './views')

// app.use('/auth', authModule)
// app.use('/user', userModule)
// app.use('/', graphqlModule)
// app.use('/', staticRouter)
app.use('/api', apiModule)

module.exports = app;