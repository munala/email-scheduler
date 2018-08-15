const Job = require('../models').jobs;
const { validateFields } = require('../utils');

module.exports = async ({ data, id }) => {
  const { cc, ...rest } = data;

  const { valid, error } = validateFields(rest);

  if (valid) {
    const existingJob = await Job.findById(id);

    if (existingJob) {
      const [_, job] = await Job.update(data, { // eslint-disable-line no-unused-vars
        where: { id },
        plain: true,
        returning: true,
      });

      return { job };
    }

    return {
      error: 'Job not found',
      code: 404,
    };
  }

  return {
    error,
    coed: 400,
  };
};
