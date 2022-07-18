const express = require('express');
const { Logger } = require('./utils/logger');
const { serverAdapter } = require('./utils/bullBoard');
const { myQueue } = require('./queue');

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/admin/queues', serverAdapter.getRouter());

app.get('/', (_req, res) => {
  res
    .status(200)
    .jsonp({ msg: 'OK' })
})

app.post('/register', async (req, res) => {
  const { body } = req
  const queue = await myQueue

  queue.add(`${body.jobName}`, { ...body.jobData })
    .then((job) => {
      res.json({
        jobName: job.name,
        jobId: job.id
      })
    })
    .catch(e => Logger.error(e, '[ADDING TASK]'))
})

app.listen(3000, () => {
  Logger.info('Server at http://localhost:3000')
  Logger.info('For the UI of tasks, open http://localhost:3000/admin/queues')
})
