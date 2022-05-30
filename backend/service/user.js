const user = require('../model/user')
const bcrypt = require('bcrypt')

async function hashPassword(params) {
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10)
  }
  return params
}

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
  return await user.create(await hashPassword(params))
}

async function updateUser(id, params) {
  if (params.password) params.password = await hashPassword(params.password)
  return await user.update(params, { where: { id } })
}

async function deleteUser(id) {
  return await user.destroy({ where: { id } })
}

module.exports = {
  listUsers,
  findUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser
}