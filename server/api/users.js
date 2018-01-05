const userRouter = require('express').Router();
const { db, User, UserBatter, UserPitcher, Batter, Pitcher } = require('../db/models');

userRouter.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next);
})

userRouter.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => res.send(user))
        .catch(next);
})

userRouter.get('/:userId/batters', (req, res, next) => {
    return UserBatter.findAll({
        where: {
            userId: req.params.userId
        }
    })
        .then(userBatters => {
            return Promise.all(userBatters.map(userBatter => {
                return Batter.findById(userBatter.batterId)
            })
        )})
        .then(batters => res.send(batters))
        .catch(next);
})

userRouter.get('/:userId/pitchers', (req, res, next) => {
    return UserPitcher.findAll({
        where: {
            userId: req.params.userId
        }
    })
        .then(userPitchers => {
            return Promise.all(userPitchers.map(userPitcher => {
                return Pitcher.findById(userPitcher.pitcherId)
            })
        )})
        .then(pitchers => res.send(pitchers))
        .catch(next);
})

userRouter.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => res.send(user))
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

userRouter.delete('/remove-batter/user/:userId/batter/:batterId', (req, res, next) => {
    UserBatter.destroy({
        where: {
            userId: req.params.userId,
            batterId: req.params.batterId
        }
    })
    .then(() => res.sendStatus(204).end())
    .catch(next);
})

userRouter.delete('/remove-pitcher/user/:userId/pitcher/:pitcherId', (req, res, next) => {
    UserPitcher.destroy({
        where: {
            userId: req.params.userId,
            pitcherId: req.params.pitcherId
        }
    })
    .then(() => res.sendStatus(204).end())
    .catch(next);
})

module.exports = userRouter;