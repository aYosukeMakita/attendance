const express = require('express')
const { User, History } = require('../../models')
const router = express.Router()

router.get('/', (_req, res) => {
  History.findAll({
    include: [{ model: User }],
    order: [['createdAt', 'desc']],
    limit: 100,
  })
    .then(histories =>
      histories.map(history => ({
        userId: history.userId,
        name: history.User.name,
        oldPresence: history.oldPresence,
        newPresence: history.newPresence,
        createdAt: history.createdAt,
      }))
    )
    .then(histories => res.send(histories))
})

module.exports = router
