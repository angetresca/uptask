const { Sequelize } = require('sequelize');

require("dotenv").config({ path: "variables.env" }); // env variables

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  define: {
    timestamps: false
  }

});

module.exports = db;
