const Sequilize = require('sequelize')

module.exports = new Sequilize('brandsRB', 'postgres', '1251247', {
  host: 'localhost',
  dialect: 'postgres'
})