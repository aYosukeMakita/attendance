const express = require('express')
const dayjs = require('dayjs')
const { User } = require('../models')
const router = express.Router()

router.get('/', (_req, res) => {
  User.findAll().then(users => {
    res.render('users', { users, dayjs })
  })
})

module.exports = router
