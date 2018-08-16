const { update } = require('../');

const error = 'Missing \'email\' field';

const params = {
  jobId: 'jobId',
};

const mockCache = {
  get: jest.fn((jobId) => {
    if (jobId) {
      return ({ cancel: jest.fn() });
    }
    return null;
  }),
};

const request = {
  body: {
    to: 'to',
    id: 'id',
  },
  app: {
    get: () => mockCache,
  },
  params,
};

jest.mock('../../lib', () => ({
  update: ({ data }) => {
    if (!data.to) {
      return { error: 'Missing \'email\' field' };
    }

    return {
      job: data,
      updatedJob: data,
    };
  },
  scheduleMail: () => {},
}));

const json = jest.fn();

const res = {
  status: () => ({
    json,
  }),
};

describe('Update controller tests', () => {
  test('Returns success response', async (done) => {
    const req = {
      ...request,
      body: {
        to: 'to',
        id: 'id',
      },
    };

    await update(req, res);

    expect(json).toHaveBeenCalledWith(req.body);
    expect(mockCache.get).toHaveBeenCalled();

    done();
  });

  test('Returns error response', async (done) => {
    const req = {
      ...request,
      params: {},
      body: {
        id: 'id',
      },
    };

    await update(req, res);

    expect(json).toHaveBeenCalledWith({ error });

    done();
  });
});

jest.clearAllMocks();
