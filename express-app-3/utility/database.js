const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeapp', 'root', 'Sifre123', {
  dialect: 'mysql',
  host: '192.168.3.2',
});

module.exports = sequelize;