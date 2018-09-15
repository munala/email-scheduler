/* eslint-disable no-console */
const amqp = require('amqplib/callback_api');
const startPublisher = require('./startPublisher');
const startWorker = require('./startWorker');

const whenConnected = async (amqpConn) => {
  const publishData = await startPublisher(amqpConn);

  await startWorker(amqpConn);

  return publishData;
};

module.exports = async (callback) => {
  amqp.connect(`${process.env.CLOUDAMQP_URL}?heartbeat=60`, async (err, amqpConn) => {
    if (err) {
      console.error('[AMQP]', err.message);
    }

    amqpConn.on('error', (error) => {
      if (error.message !== 'Connection closing') {
        console.error('[AMQP] conn error', error.message);
      }
    });

    console.log('[AMQP] connected');

    const publishData = await whenConnected(amqpConn);

    callback(publishData);
  });
};
