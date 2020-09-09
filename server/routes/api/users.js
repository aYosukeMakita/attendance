const express = require('express')
const { User } = require('../../models')
const router = express.Router()

router.get('/', (_req, res) => {
  User.findAll({ attributes: ['id', 'name'] }).then(users => res.send(users))
})

router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
  }).then(user =>
    res.status(201).send({
      id: user.id,
      name: user.name,
    })
  )
})

router.get('/:userId', (req, res) => {
  User.findByPk(req.params.userId, { attributes: ['id', 'name'] })
    .then(user => res.send(user))
    .catch(() => {
      res.status(404).send({
        message: 'not found',
      })
    })
})

router.put('/:userId', (req, res) => {
  User.findByPk(req.params.userId)
    .then(user => user.update({ name: req.body.name }))
    .then(user =>
      res.send({
        id: user.id,
        name: user.name,
      })
    )
    .catch(() => {
      res.status(404).send({
        message: 'not found',
      })
    })
})

router.delete('/:userId', (req, res) => {
  User.findByPk(req.params.userId)
    .then(user => user.destroy())
    .then(() => res.status(204).end())
    .catch(() => {
      res.status(404).send({
        message: 'not found',
      })
    })
})

module.exports = router
