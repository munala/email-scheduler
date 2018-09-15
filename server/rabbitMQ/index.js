/* eslint-disable no-console */
const amqp = require('amqplib/callback_api');
const startPublisher = require('./startPublisher');
const startWorker = require('./startWorker');

const whenConnected = async ({ amqpConn, callback }) => {
  await startPublisher({
    amqpConn,
    callback: async (publishData) => {
      startWorker({ amqpConn, publishData });
      callback(publishData);
    },
  });
};

module.exports = async (callback) => {
  try {
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

      whenConnected({ amqpConn, callback });
    });
  } catch (error) {
    console.log({ error });
  }
};
