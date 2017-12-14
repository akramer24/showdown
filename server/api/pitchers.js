const pitcherRouter = require('express').Router();
const { db, Pitcher } = require('../db/models');

pitcherRouter.get('/', (req, res, next) => {
    Pitcher.findAll({
        order: [
            ['lastName', 'ASC']
        ]
    })
        .then(pitchers => res.send(pitchers))
        .catch(next);
})

pitcherRouter.get('/:pitcherId', (req, res, next) => {
    Pitcher.findById(req.params.pitcherId)
        .then(pitcher => res.send(pitcher))
        .catch(next);
})

module.exports = pitcherRouter;