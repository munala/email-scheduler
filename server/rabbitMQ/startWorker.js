/* eslint-disable no-console */
const processMessage = require('./processMessage');
const closeOnError = require('./closeOnError');

module.exports = ({ amqpConn, publishData }) => {
  amqpConn.createChannel((err, channel) => {
    if (closeOnError({ amqpConn, error: err })) return;

    channel.on('error', (error) => {
      console.error('[AMQP] channel error', error.message);
    });

    channel.on('close', () => {
      console.log('[AMQP] channel closed');
    });

    channel.prefetch(10);

    channel.assertQueue('email_queue', { durable: true }, (error) => {
      if (closeOnError({ amqpConn, error })) return;

      channel.consume('email_queue', message => processMessage({
        message, channel, amqpConn, publishData,
      }), { noAck: false });

      console.log('Worker is started');
    });
  });
};
