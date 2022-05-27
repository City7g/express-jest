const user = require('../model/user')

module.exports = {
  async getUsers() {
    return await user.findAll()
  }
}