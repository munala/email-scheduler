const { schedule } = require('../');

const error = 'Missing \'email\' field';

jest.mock('../../lib', () => ({
  schedule: (body) => {
    if (!body.to) {
      return { error: 'Missing \'email\' field' };
    }

    return {
      job: body,
      scheduledJob: body,
    };
  },
}));

const json = jest.fn();

const res = {
  status: () => ({
    json,
  }),
};

const mockCache = {
  put: jest.fn(),
};

describe('Schedule controller tests', () => {
  test('Returns success response', async (done) => {
    const req = {
      body: {
        to: 'to',
        id: 'id',
      },
      app: {
        get: () => mockCache,
      },
    };


    await schedule(req, res);

    expect(json).toHaveBeenCalledWith(req.body);
    expect(mockCache.put).toHaveBeenCalled();

    done();
  });

  test('Returns error response', async (done) => {
    const req = {
      body: {
        id: 'id',
      },
      app: {
        get: () => mockCache,
      },
    };

    await schedule(req, res);

    expect(json).toHaveBeenCalledWith({ error });

    done();
  });
});

jest.clearAllMocks();
