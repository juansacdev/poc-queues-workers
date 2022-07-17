const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { myQueue } = require('../queue');

const serverAdapter = new ExpressAdapter();
createBullBoard({
  queues: [new BullMQAdapter(myQueue)],
  serverAdapter
})

serverAdapter.setBasePath('/admin/queues');

module.exports = {
  serverAdapter
}
