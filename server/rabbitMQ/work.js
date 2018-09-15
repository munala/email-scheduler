const handelRequset = require('../lib/handleRequest');

module.exports = async ({ message, callback, publishData }) => {
  await handelRequset({
    publishData,
    message: JSON.parse(message.content.toString()),
  });

  callback(true);
};
