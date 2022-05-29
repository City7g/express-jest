const Sequelize = require('sequelize');
const sequelize = require('../data/db')

const user = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = user