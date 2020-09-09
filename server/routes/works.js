const express = require('express')
const dayjs = require('dayjs')
const { User, Work } = require('../models')
const router = express.Router()

router.get('/', (_req, res) => {
  Work.findAll({
    include: [{ model: User }],
  }).then(works => res.render('works', { works, dayjs }))
})

module.exports = router
