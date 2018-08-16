const { update } = require('../');
const Job = require('../../models').jobs;

const existingJobData = {
  to: 'updated@existing.com',
  date: '"2018-08-15 20:18:00+03"',
  subject: 'subject',
  body: 'body',
};

const newJobData = {
  to: 'updated@new.com',
  date: '"2018-08-15 20:18:00+03"',
  subject: 'subject',
  body: 'body',
};

const inValidJobData = {
  to: 'updated@new.com',
  subject: 'subject',
  body: 'body',
};

let jobId;

describe('Update lib tests', () => {
  beforeEach(async (done) => {
    const { id } = await Job.create(existingJobData);

    jobId = id;

    done();
  });

  afterEach(async (done) => {
    await Job.destroy({ where: {} });
    done();
  });

  test('Updates successfully', async (done) => {
    const { job } = await update({
      data: {
        ...newJobData,
        id: jobId,
      },
      id: jobId,
    });

    expect(job.to).toEqual(newJobData.to);

    done();
  });

  test('Resturns error if job does not exist', async (done) => {
    const { error, code } = await update({
      data: newJobData,
      id: 'incorrect id',
    });

    expect(error).toEqual('Job not found');
    expect(code).toEqual(404);

    done();
  });

  test('Resturns error if job data is invalid', async (done) => {
    const { error, code } = await update({
      data: inValidJobData,
      id: jobId,
    });

    expect(error).toEqual('Missing \'date\' field');
    expect(code).toEqual(400);

    done();
  });
});
