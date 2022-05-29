const express = require('express');
const router = express.Router();

const userModule = require('./user')

router.use('/users', userModule)

module.exports = router;