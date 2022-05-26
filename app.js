const express = require("express");
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()

const authModule = require('./src/module/auth/auth')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/user", (req, res) => {
  res.status(201).json({user: '1'})
})

app.use('/auth', authModule)

module.exports = app;