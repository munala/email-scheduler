const { verifyToken } = require('../');

const token = 'token';
const json = jest.fn();
const next = () => {};
const res = {
  status: () => ({ json }),
};

describe('Verify token tests', () => {
  beforeAll(() => {
    process.env.AUTH_TOKEN = 'token';
  });

  test('Passes verification', () => {
    const req = {
      headers: {
        token,
      },
    };

    const nextMock = jest.fn();

    verifyToken(req, res, nextMock);

    expect(nextMock).toHaveBeenCalled();
  });

  test('Fails if no token is passed', () => {
    const req = {
      headers: { },
    };

    verifyToken(req, res, next);

    expect(json).toHaveBeenCalledWith({
      message: 'Unauthorised',
    });
  });

  test('Fails if wrong token is passesd', () => {
    const req = {
      headers: {
        token: 'wrong token',
      },
    };

    verifyToken(req, res, next);

    expect(json).toHaveBeenCalledWith({
      message: 'Unauthorised',
    });
  });
});
