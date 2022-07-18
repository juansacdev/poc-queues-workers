const { Queue, Worker, QueueScheduler, Job, QueueEvents } = require('bullmq')
const { Logger } = require('../utils/logger')

// Redis connection options
const connectionOpts = {
  port: 6379,
  host: 'localhost',
}

// Create a new connection in every instance
async function setUpQueues(name, connectionOpts) {
  const queue = new Queue(name, { connection: connectionOpts })

  const queueScheduler = new QueueScheduler(name, { connection: connectionOpts })
  await queueScheduler.waitUntilReady()

  queue.once('cleaned', (jobs, type) => {
    Logger.info({
      jobs,
      type
    }, 'QUEUE_CLEANED')
  })

  return queue
}

const myQueue = setUpQueues('OPERATIONS', connectionOpts)

module.exports = {
  myQueue,
  connectionOpts
}
