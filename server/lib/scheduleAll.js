const Job = require('../models').jobs;
const scheduleMail = require('./scheduleMail');
const { asyncForEach } = require('../utils');

module.exports = async (cache) => {
  const rows = await Job.findAll({
    where: { },
  });

  const jobs = rows.map(row => row.dataValues);

  await asyncForEach(jobs, async (job) => {
    if (job.finished === false) {
      const scheduledJob = await scheduleMail(job);

      cache.put(job.id, scheduledJob);
    } else {
      await Job.destroy({ where: { id: job.id } });
    }
  });
};
