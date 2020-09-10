const express = require('express')
const { User, Work } = require('../../models')
const router = express.Router()

router.get('/', (_req, res) => {
  Work.findAll().then(works => res.send(works))
})

router.post('/', (req, res) => {
  Work.create({
    userId: req.body.userId,
    atOffice: req.body.atOffice,
    onWork: true,
    startedAt: new Date(),
  })
    .then(work => res.status(201).send(work))
    .catch(() => res.status(400).send({ message: 'bad request' }))
})

router.get('/latest', async (_req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name'] }).then(users =>
    users.map(user => ({
      userId: user.id,
      name: user.name,
    }))
  )

  const latestWorks = await Promise.all(
    users.map(async ({ userId, name }) => {
      const work = await Work.findOne({
        include: [{ model: User }],
        where: { userId },
        order: [['createdAt']],
      })

      if (!work) {
        return {
          name,
          startedAt: null,
          finishedAt: null,
          atOffice: null,
          onWork: null,
        }
      }

      return {
        name: work.User.name,
        startedAt: work.startedAt,
        finishedAt: work.finishedAt,
        atOffice: work.atOffice,
        onWork: work.onWork,
      }
    })
  )

  const compact = latestWorks.filter(n => n)
  res.send(compact)
})

router.get('/:workId', async (req, res) => {
  const work = await getUser(req)
  if (!work) {
    return res.status(404).send({ message: 'not found' })
  }

  res.send({
    name: work.User.name,
    startedAt: work.startedAt,
    finishedAt: work.finishedAt,
    atOffice: work.atOffice,
    onWork: work.onWork,
  })
})

router.put('/:workId', async (req, res) => {
  const work = await getUser(req)
  if (!work) {
    return res.status(404).send({ message: 'not found' })
  }

  try {
    const updatedWork = await work.update(req.body)

    res.send({
      name: work.User.name,
      startedAt: updatedWork.startedAt,
      finishedAt: updatedWork.finishedAt,
      atOffice: updatedWork.atOffice,
      onWork: updatedWork.onWork,
    })
  } catch (e) {
    res.status(400).send({
      message: 'bad request',
    })
  }
})

router.delete('/:workId', async (req, res) => {
  const work = await getUser(req)
  if (!work) {
    return res.status(404).send({ message: 'not found' })
  }

  try {
    await work.destroy()
    res.status(204).end()
  } catch (e) {
    res.status(400).send({
      message: 'bad request',
    })
  }
})

const getUser = req => {
  return Work.findByPk(req.params.workId, {
    include: [{ model: User }],
  })
}

module.exports = router
