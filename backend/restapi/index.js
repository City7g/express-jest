const express = require('express');
const router = express.Router();

const authModule = require('./auth')
const userModule = require('./user')

router.use('/auth', authModule)
router.use('/users', userModule)

module.exports = router;