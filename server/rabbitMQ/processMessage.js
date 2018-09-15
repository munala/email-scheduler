const work = require('./work');
const closeOnError = require('./closeOnError');

module.exports = ({ message, channel, amqpConn }) => {
  work({
    message,
    callback: (ok) => {
      try {
        if (ok) channel.ack(message);

        else channel.reject(message, true);
      } catch (error) {
        closeOnError({ error, amqpConn });
      }
    },
  });
};
