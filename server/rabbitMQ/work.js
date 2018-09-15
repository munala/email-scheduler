/* eslint-disable no-console */
module.exports = ({ message, callback }) => {
  // TODO: Do something with message
  console.log('Message received:', JSON.parse(message.content.toString()));

  callback(true);
};
