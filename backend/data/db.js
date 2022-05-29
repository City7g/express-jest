const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env.HEROKU_TABLE, process.env.HEROKU_USER, process.env.HEROKU_PASSWORD, {
  host: process.env.HEROKU_HOST,
  dialect: process.env.HEROKU_TYPE,
  logging: false
});

module.exports = sequelize