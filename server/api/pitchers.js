const pitcherRouter = require('express').Router();
const { db, Pitcher } = require('../db/models');

pitcherRouter.get('/', (req, res, next) => {
    Pitcher.findAll()
        .then(pitchers => res.send(pitchers))
        .catch(next);
})

module.exports = pitcherRouter;