//set up associations

const db = require('../index');
const Batter = require('./Batter');
const Pitcher = require('./Pitcher');
const User = require('./User');

Batter.belongsToMany(User, {through: 'UserBatter'});
Pitcher.belongsToMany(User, {through: 'UserPitcher'});

module.exports = {
    db,
    Batter,
    Pitcher,
    User
};