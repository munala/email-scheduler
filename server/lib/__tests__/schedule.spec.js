const { schedule } = require('../');
const Job = require('../../models').jobs;

const existingJobData = {
  to: 'test@existing.com',
  date: '"2018-08-15 20:18:00+03"',
  subject: 'subject',
  body: 'body',
};

const newJobData = {
  to: 'test@new.com',
  date: '"2018-08-15 20:18:00+03"',
  subject: 'subject',
  body: 'body',
};

const inValidJobData = {
  to: 'test@new.com',
  subject: 'subject',
  body: 'body',
};

describe('Schedule lib tests', () => {
  beforeEach(async (done) => {
    await Job.create(existingJobData);
    done();
  });

  afterEach(async (done) => {
    await Job.destroy({ where: {} });
    done();
  });

  test('Schedules successfully', async (done) => {
    const { job } = await schedule(newJobData);

    expect(job.to).toEqual(newJobData.to);

    done();
  });

  test('Resturns error if job is already scheduled', async (done) => {
    const { error, code } = await schedule(existingJobData);

    expect(error).toEqual('Job already scheduled');
    expect(code).toEqual(409);

    done();
  });

  test('Resturns error if job data is invalid', async (done) => {
    const { error, code } = await schedule(inValidJobData);

    expect(error).toEqual('Missing \'date\' field');
    expect(code).toEqual(400);

    done();
  });
});
