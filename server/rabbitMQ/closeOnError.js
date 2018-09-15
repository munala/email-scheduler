/* eslint-disable no-console */
module.exports = ({ error, amqpConn }) => {
  if (!error) return false;

  console.error('[AMQP] error', error);

  amqpConn.close();

  return true;
};
