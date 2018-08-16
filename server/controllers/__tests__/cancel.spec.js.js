const { cancel } = require('../');

const error = 'Job not found';

const params = {
  jobId: 'jobId',
};

const message = {
  message: 'Successfully cancelled job',
};

const mockCache = {
  get: jest.fn((jobId) => {
    if (jobId) {
      return ({ cancel: jest.fn() });
    }
    return null;
  }),
  del: () => {},
};

const request = {
  app: {
    get: () => mockCache,
  },
  params,
};

jest.mock('../../lib', () => ({
  cancel: (id) => {
    if (!id) {
      return { error: 'Job not found' };
    }

    return {};
  },
}));

const json = jest.fn();

const res = {
  status: () => ({
    json,
  }),
};

describe('Cancel controller tests', () => {
  test('Returns success response', async (done) => {
    await cancel(request, res);

    expect(json).toHaveBeenCalledWith(message);
    expect(mockCache.get).toHaveBeenCalled();

    done();
  });

  test('Returns error response', async (done) => {
    const req = {
      ...request,
      params: {},
    };

    await cancel(req, res);

    expect(json).toHaveBeenCalledWith({ error });

    done();
  });
});

jest.clearAllMocks();
