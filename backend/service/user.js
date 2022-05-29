const user = require('../model/user')
const bcrypt = require('bcrypt')

async function listUsers() {
  return await user.findAll()
}

async function findUser(query) {
  return await user.findOne({ where: query })
}

async function findUserById(query) {
  return await user.findOne({ where: query })
}

async function createUser(params) {
  if (params.password) params.password = (await bcrypt.hash(params.password, 10))
  return await user.create(params)
}

async function updateUser(id, params) {
  if (params.password) params.password = (await bcrypt.hash(params.password, 10))
  return await user.update(params, { where: { id } })
}

module.exports = {
  listUsers,
  findUser,
  findUserById,
  createUser,
  updateUser
}