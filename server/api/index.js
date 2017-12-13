//set up routes to players and users
const apiRouter = require('express').Router();
const {db} = require('../db');

apiRouter.use('/batters', require('./batters.js'));
apiRouter.use('/pitchers', require('./pitchers.js'));
apiRouter.use('/users', require('./users.js'));

module.exports = apiRouter;