const batterRouter = require('express').Router();
const { db, Batter } = require('../db/models');

batterRouter.get('/', (req, res, next) => {
    Batter.findAll({
        order: [
            ['lastName', 'ASC']
        ]
    })
        .then(batters => res.send(batters))
        .catch(next);
})

batterRouter.get('/:batterId', (req, res, next) => {
    Batter.findById(req.params.batterId)
        .then(batter => res.send(batter))
        .catch(next);
})

module.exports = batterRouter;