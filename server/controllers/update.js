const { update, scheduleMail } = require('../lib');

module.exports = async (req, res) => {
  const cache = req.app.get('cache');
  const { jobId } = req.params;

  const scheduledJob = cache.get(jobId);

  if (scheduledJob) {
    scheduledJob.cancel();
  }

  const { error, code, job } = await update({
    data: req.body,
    id: jobId,
  });

  if (error) {
    res.status(code).json({
      error,
    });
  } else {
    scheduleMail(req.body);

    res.status(200).json(job);
  }
};
