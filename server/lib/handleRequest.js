const schedule = require('./schedule');
const update = require('./update');
const cancel = require('./cancel');
const publish = require('../rabbitMQ/publish');

module.exports = async ({ publishData, message: { type, data } }) => {
  if (type === 'new') {
    const result = await schedule(data);

    publish({
      ...publishData,
      exchange: '',
      routingKey: 'email_sender',
      content: Buffer.from(JSON.stringify({
        jobId: result.job.id,
        bucketlistId: data.bucketlistId,
      })),
    });
  } else if (type === 'update') {
    await update({
      data,
      id: data.jobId,
    });
  } else if (type === 'cancel') {
    await cancel(data.jobId);
  }
};
