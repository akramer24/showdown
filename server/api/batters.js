const batterRouter = require('express').Router();
const { db, Batter } = require('../db/models');

batterRouter.get('/', (req, res, next) => {
    Batter.findAll()
        .then(batters => res.send(batters))
        .catch(next);
})

module.exports = batterRouter;