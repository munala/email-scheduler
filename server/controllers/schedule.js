const { schedule } = require('../lib');

module.exports = async (req, res) => {
  const cache = req.app.get('cache');

  const {
    job, scheduledJob, error, code,
  } = await schedule(req.body);

  if (error) {
    res.status(code).json({ error });
  } else {
    cache.put(job.id, scheduledJob);

    res.status(201).json(job);
  }
};
