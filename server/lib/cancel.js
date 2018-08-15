const Job = require('../models').jobs;

module.exports = async (id) => {
  const job = await Job.findById(id);

  if (job) {
    Job.destroy({ where: { id } });

    return {};
  }

  return {
    error: 'Job not found',
    code: 404,
  };
};
