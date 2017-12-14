const db = require('../index.js');
const Sequelize = require('sequelize');

const UserPitcher = db.define('userPitcher', {
    userId: Sequelize.INTEGER,
    pitcherId: {
        type: Sequelize.INTEGER,
        unique: false
    }
})

module.exports = UserPitcher;