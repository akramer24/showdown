const db = require('../index.js');
const Sequelize = require('sequelize');

const UserBatter = db.define('userBatter', {
    userId: Sequelize.INTEGER,
    batterId: {
        type: Sequelize.INTEGER,
        unique: false
    }
})

module.exports = UserBatter;