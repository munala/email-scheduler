const { cancel } = require('../lib');

module.exports = async (req, res) => {
  const cache = req.app.get('cache');
  const { jobId } = req.params;

  const job = cache.get(jobId);

  if (job) {
    job.cancel();
    cache.del(jobId);
  }

  const { error, code } = await cancel(jobId);

  if (error) {
    res.status(code).json({
      error,
    });
  } else {
    res.status(200).json({
      message: 'Successfully cancelled job',
    });
  }
};
