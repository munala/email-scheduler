const Job = require('../models').jobs;
const { validateFields } = require('../utils');
const scheduleMail = require('./scheduleMail');

module.exports = async (data) => {
  const { valid, error } = validateFields(data);

  if (valid) {
    const [job, created] = await Job.findOrCreate({
      where: data,
      defaults: data,
      plain: true,
    });

    if (created) {
      const scheduledJob = await scheduleMail(data);

      return {
        job,
        scheduledJob,
      };
    }

    return {
      error: 'Job already scheduled',
      code: 409,
    };
  }

  return {
    error,
    code: 400,
  };
};
