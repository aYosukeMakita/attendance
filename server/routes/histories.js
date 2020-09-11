const express = require('express')
const dayjs = require('dayjs')
const { User, History } = require('../models')
const router = express.Router()

router.get('/', (_req, res) => {
  History.findAll({
    include: [{ model: User }],
  }).then(histories => res.render('histories', { histories, dayjs }))
})

module.exports = router
