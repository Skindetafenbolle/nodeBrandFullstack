// const Sequilize = require('sequelize')

// module.exports = new Sequilize('brandsrb', 'wikyx', 'Hik9sPSPRkP3Ds8R3o3Hhvc9SuvxUSD4', {
//   host: 'localhost',
//   dialect: 'postgres'
// })

const { Sequelize } = require('sequelize');

module.exports = new Sequelize('postgres://wikyx:Hik9sPSPRkP3Ds8R3o3Hhvc9SuvxUSD4@dpg-cmogsfa1hbls73b5uhjg-a.oregon-postgres.render.com/brandsrb', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Только если ваш сервер не использует подписанный SSL-сертификат
    },
  },
});