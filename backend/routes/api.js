const express = require('express')
const usersRouter = require('./users')

const router = express.Router()
//Organizziamo le routes
router.use('/users', usersRouter)

module.exports = router



