const express = require('express')
const { User, History } = require('../../models')
const router = express.Router()
const sendmail = require('../../lib/mailer')

router.get('/', (_req, res) => {
  User.findAll({ attributes: ['id', 'name', 'presence', 'atOffice', 'updatedAt'] }).then(users => res.send(users))
})

router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    presence: 'finished',
    atOffice: false,
  }).then(user =>
    res.status(201).send({
      id: user.id,
      name: user.name,
      presence: user.presence,
      atOffice: user.atOffice,
    })
  )
})

router.get('/:userId', (req, res) => {
  User.findByPk(req.params.userId, { attributes: ['id', 'name', 'presence', 'atOffice'] })
    .then(user => res.send(user))
    .catch(() => {
      res.status(404).send({
        message: 'not found',
      })
    })
})

router.get('/:userId/histories', (req, res) => {
  History.findAll({
    where: { userId: req.params.userId },
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

const createHistory = (user, params) => {
  if ('presence' in params && params.presence !== user.presence) {
    History.create({
      userId: user.id,
      oldPresence: user.presence,
      newPresence: params.presence,
    })
  }
}

router.put('/:userId', (req, res) => {
  if (req.body.presence && !['working', 'finished', 'break'].includes(req.body.presence)) {
    return res.status(400).send({
      message: `bad parameter: ${req.body.presence}`,
    })
  }

  User.findByPk(req.params.userId)
    .then(user => {
      // user.update()でuserが変更されるよりも前にpresenceの変化を調べる
      const beforePresence = user.presence
      const afterPresence = req.body.presence
      if (!['working', 'finished'].includes(afterPresence)) {
        return { user, subjectType: null }
      }
      if (beforePresence === 'break') {
        return { user, subjectType: null }
      }

      if (beforePresence === 'working' && afterPresence === 'finished') {
        return { user, subjectType: '終了' }
      } else if (beforePresence === 'finished' && afterPresence === 'working') {
        return { user, subjectType: '開始' }
      } else {
        return { user, subjectType: null }
      }
    })
    .then(({ user, subjectType }) => {
      createHistory(user, req.body)
      user.update(req.body)
      return { user, subjectType }
    })
    .then(({ user, subjectType }) => {
      if (!subjectType) {
        return user
      }

      sendmail({ user, subjectType })
      return user
    })
    .then(user => {
      res.send({
        id: user.id,
        name: user.name,
        presence: user.presence,
        atOffice: user.atOffice,
      })
    })
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
