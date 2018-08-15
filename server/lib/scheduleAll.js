const Job = require('../models').jobs;
const scheduleMail = require('./scheduleMail');

module.exports = async (cache) => {
  const rows = await Job.findAll({
    where: {
      finished: false,
    },
  });

  const jobs = rows.map(row => row.dataValues);

  jobs.forEach((job) => {
    const scheduledJob = scheduleMail(job);

    cache.put(job.id, scheduledJob);
  });
};
