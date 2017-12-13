const db = require('../index.js');
const Sequelize = require('sequelize');

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }, 
    teamName: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    getterMethods: {
        name() {
            return this.firstName + ' ' + this.lastName;
        }
    }
})

module.exports = User;