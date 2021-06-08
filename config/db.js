const { Sequelize } = require('sequelize');

const db = new Sequelize('uptask', 'root', 'rootroot', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
  define: {
      timestamps: false
  }

});

module.exports = db;
