const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { myQueue } = require('../queue');
const { Logger } = require('./logger');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

myQueue
  .then(queue => {
    createBullBoard({
      queues: [new BullMQAdapter(queue)],
      serverAdapter
    })
  })
  .catch(e => Logger.error(e, '[TASK_BOARD]'))

module.exports = {
  serverAdapter
}
