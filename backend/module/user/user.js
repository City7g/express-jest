const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../model/user')
const { list: listUsers } = require('../../service/user')
const isAdmin = require('../../middleware/isAdmin')

router.get('/users', async (req, res) => {
  const users = await listUsers();
  res.status(200).json({ users })
  // res.status(200).render('index', { users })
})

module.exports = router;
