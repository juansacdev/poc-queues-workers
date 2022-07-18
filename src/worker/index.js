const { Worker } = require('bullmq')
const { connectionOpts } = require('../queue');
const { Logger } = require('../utils/logger');

const OPERATIONS = {
  SUM: async ({ x, y }) => {
    return x + y
  },
  REST: async ({ x, y }) => {
    return x - y
  },
  MULTIPLY: async ({ x, y }) => {
    return x * y
  },
  DIVIDE: async ({ x, y }) => {
    return x / y
  }
}

async function processor(job) {
  const operation = job.name
  const fn = OPERATIONS[operation]
  const result = await fn(job.data)
  return result
}

async function init(name) {
  const worker = new Worker(name, processor, {
    connection: connectionOpts,
    concurrency: 8,
    autorun: false
  })

  worker.on('completed', (job, result, prev) => {
    Logger.info({
      JOB_RESULT: result,
      JOB_ID: job.id,
      JOB_PREV: prev
    }, 'JOB_COMPLETED')
  })

  worker.on('failed', (job, error, prev) => {
    Logger.info({
      JOB_ID: job.id,
      JOB_ERROR: error,
      JOB_PREV: prev
    }, 'JOB_FAILED')
  })

  worker.on('error', (error) => {
    Logger.error(error, 'JOB_ERROR')
  })

  // Turn on worker
  worker.run()
}

init('OPERATIONS')
  .then(() => Logger.info('WORKER IS RUNNING! 🚀'))
  .catch(e => Logger.error(e))
