const db = require('../index.js');
const Sequelize = require('sequelize');

const Batter = db.define('batter', {
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
    onBase: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    SO: Sequelize.ARRAY(Sequelize.INTEGER),
    GB: Sequelize.ARRAY(Sequelize.INTEGER),
    FB: Sequelize.ARRAY(Sequelize.INTEGER),
    BB: Sequelize.ARRAY(Sequelize.INTEGER),
    single: Sequelize.ARRAY(Sequelize.INTEGER),
    singlePlus: Sequelize.ARRAY(Sequelize.INTEGER),
    double: Sequelize.ARRAY(Sequelize.INTEGER),
    triple: Sequelize.ARRAY(Sequelize.INTEGER),
    homeRun: Sequelize.ARRAY(Sequelize.INTEGER),
    speed: Sequelize.INTEGER,
    bats: Sequelize.STRING,
    position: Sequelize.STRING,
    image: Sequelize.STRING
},  {
    getterMethods: {
        name() {
            return this.firstName + ' ' + this.lastName;
        }
    }
})

module.exports = Batter;