// create database here

const Sequelize = require('sequelize');

module.exports = new Sequelize('postgres://localhost:5432/mlb-showdown', {
    logging: false
});