const userRouter = require('express').Router();
const { db, User, UserBatter, UserPitcher } = require('../db/models');

userRouter.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next);
})

userRouter.post('/add-batter', (req, res, next) => {
    User.findOne({
        where: {
            teamName: req.body.userTeam
        }
    })
    .then(user => {
        UserBatter.create({
            userId: user.id,
            batterId: req.body.batterId
        })
            .then(result => res.send(result))
            .catch(next)
    })
})

userRouter.post('/add-pitcher', (req, res, next) => {
    User.findOne({
        where: {
            teamName: req.body.userTeam
        }
    })
    .then(user => {
        UserPitcher.create({
            userId: user.id,
            pitcherId: req.body.pitcherId
        })
            .then(result => res.send(result))
            .catch(next)
    })
})

module.exports = userRouter;