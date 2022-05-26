const jwt = require('jsonwebtoken')

function isAdmin(req, res, next) {
  if(!req.headers.authorization) return res.status(404).send('Need authorization')
  const { user } = jwt.verify(req.headers.authorization.replace(/Bearer /, ''), process.env.JWT_SECRET_KEY)
  if(user !== 15) return res.status(404).send('Вы не админ')
  next()
}

module.exports = isAdmin