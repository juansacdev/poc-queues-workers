const { Queue, Worker, QueueScheduler, Job } = require('bullmq')

// Redis connection options
const connectionOpts = {
  port: 6379,
  host: 'localhost',
  password: '',
  tls: false,
}

// Create a new connection in every instance
async function setUpQueue(queueName, connectionOpts) {
  const queue = new Queue(queueName, { connection: connectionOpts })
  const queueScheduler = new QueueScheduler(queueName, { connection: connectionOpts })
  await queueScheduler.waitUntilReady()

  return queue
}

const myQueue = setUpQueue('myQueue', connectionOpts)

module.exports = {
  myQueue
}

// const myWorker = new Worker('myworker', async (job)=>{}, { connection: {
//   host: "myredis.taskforce.run",
//   port: 32856
// }});




// async function addJobs() {
//   const job1 = await myQueue.add('myJobName', { foo: 'bar' });
//   const job2 = await myQueue.add('myJobName', { qux: 'baz' });
//   return {
//     job1,
//     job2
//   }
// }

// addJobs()
//   .then(jobs => console.log(jobs))
//   .catch(e => console.log(e))
