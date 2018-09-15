/* eslint-disable no-console */
module.exports = ({
  exchange,
  routingKey,
  content,
  publishChannel,
  offlinePubQueue,
}) => {
  try {
    publishChannel.publish(exchange || '', routingKey || 'email_queue', content, { persistent: true },
      (error) => {
        if (error) {
          console.error('[AMQP] publish', error);

          if (offlinePubQueue) {
            offlinePubQueue.push([exchange, routingKey, content]);
          }

          publishChannel.connection.close();
        }
      });
  } catch (error) {
    console.error('[AMQP] publish', error.message);

    if (offlinePubQueue) {
      offlinePubQueue.push([exchange, routingKey, content]);
    }
  }
};
