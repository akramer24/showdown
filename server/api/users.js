const userRouter = require('express').Router();
const { db, User } = require('../db/models');

userRouter.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next);
})

module.exports = userRouter;