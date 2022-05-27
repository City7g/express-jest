const user = require('../model/user')

async function list() {
  return await user.findAll()
}

async function find(query) {
  return await user.findOne({ where: query })
}

module.exports = {
  list,
  find
}