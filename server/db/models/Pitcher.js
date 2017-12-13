const db = require('../index.js');
const Sequelize = require('sequelize');

const Pitcher = db.define('pitcher', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    control: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    PU: Sequelize.ARRAY(Sequelize.INTEGER),
    SO: Sequelize.ARRAY(Sequelize.INTEGER),
    GB: Sequelize.ARRAY(Sequelize.INTEGER),
    FB: Sequelize.ARRAY(Sequelize.INTEGER),
    BB: Sequelize.ARRAY(Sequelize.INTEGER),
    single: Sequelize.ARRAY(Sequelize.INTEGER),
    double: Sequelize.ARRAY(Sequelize.INTEGER),
    homeRun: Sequelize.ARRAY(Sequelize.INTEGER),
    IP: Sequelize.INTEGER,
    throws: Sequelize.STRING,
    position: Sequelize.STRING,
    image: Sequelize.STRING
},  {
    getterMethods: {
        name() {
            return this.firstName + ' ' + this.lastName;
        }
    }
})

module.exports = Pitcher;