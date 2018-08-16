const { cancel } = require('../');
const Job = require('../../models').jobs;

const existingJobData = {
  to: 'canceld@existing.com',
  date: '"2018-08-15 20:18:00+03"',
  subject: 'subject',
  body: 'body',
};
let jobId;

describe('Cancel lib tests', () => {
  beforeEach(async (done) => {
    const { id } = await Job.create(existingJobData);

    jobId = id;

    done();
  });

  afterEach(async (done) => {
    await Job.destroy({ where: {} });
    done();
  });

  test('Cancels successfully', async (done) => {
    const response = await cancel(jobId);

    expect(response).toEqual({});

    done();
  });

  test('Resturns error if job does not exist', async (done) => {
    const { error, code } = await cancel('incorrect id');

    expect(error).toEqual('Job not found');
    expect(code).toEqual(404);

    done();
  });
});
