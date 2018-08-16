const Job = require('../../models').jobs;
const { scheduleAll } = require('../');

const existingJobData = {
  to: 'schedule@existing.com',
  date: '"2018-08-15 20:18:00+03"',
  subject: 'subject',
  body: 'body',
};

const anotherJobData = {
  to: 'schedule@existing.com',
  date: '"2018-08-17 20:18:00+03"',
  subject: 'another subject',
  body: 'another body',
  finished: true,
};

jest.mock('node-schedule', () => ({
  scheduleJob: async (date, callback) => {
    await callback();
  },
}));

describe('Schedule mail lib tests', () => {
  beforeEach(async (done) => {
    await Job.create(existingJobData);

    await Job.create(anotherJobData);

    done();
  });

  afterEach(async (done) => {
    await Job.destroy({ where: {} });
    done();
  });

  test('Schedules all mails successfully', async (done) => {
    const cache = {
      put: jest.fn(),
    };

    await scheduleAll(cache);

    expect(cache.put).toHaveBeenCalled();

    done();
  });
});

jest.clearAllMocks();
