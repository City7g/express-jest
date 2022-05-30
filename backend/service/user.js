const user = require('../model/user')
const bcrypt = require('bcrypt')

async function hashPassword(params) {
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10)
  }
  return params
}

async function listUsers() {
  try {
    return await user.findAll()
  } catch (err) {
    throw 'Server error'
  }
}

async function findUser(query) {
  try {
    return await user.findOne({ where: query })
  } catch (err) {
    throw 'Server error'
  }
}

async function findUserById(id) {
  try {
    return await user.findByPk(id)
  } catch (err) {
    throw 'Server error'
  }
}

async function createUser(params) {
  try {
    const candidate = await findUser({ name: params.name })
    if(candidate) throw 'Такой пользователь уже существует'
    
    return await user.create(await hashPassword(params))
  } catch (err) {
    throw 'Server error'
  }
}

async function updateUser(id, params) {
  try {
    const candidate = await findUserById(id)
    if(candidate) throw 'Пользователя с такий id не существует'

    return await user.update(await hashPassword(params), { where: { id } })
  } catch (err) {
    throw 'Server error'
  }
}

async function deleteUser(id) {
  try {
    return await user.destroy({ where: { id } })
  } catch (err) {
    throw 'Server error'
  }
}

module.exports = {
  listUsers,
  findUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser
}