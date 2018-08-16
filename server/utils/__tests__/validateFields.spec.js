const { validateFields } = require('../');

describe('Validation tests', () => {
  test('Passes validation', () => {
    const data = {
      date: 'due date',
      to: 'test@user.com',
      body: 'email body',
      subject: 'subject',
    };

    const { valid } = validateFields(data);

    expect(valid).toBeTruthy();
  });

  test('Fails when a required param is not passed', () => {
    const data = {
      date: 'due date',
      body: 'email body',
      subject: 'subject',
    };

    const { valid, error } = validateFields(data);

    expect(valid).toBeFalsy();
    expect(error).toEqual('Missing \'to\' field');
  });

  test('Fails when a required param is empty', () => {
    const data = {
      date: 'due date',
      to: '',
      body: 'email body',
      subject: 'subject',
    };

    const { valid, error } = validateFields(data);

    expect(valid).toBeFalsy();
    expect(error).toEqual('Empty \'to\' field');
  });

  test('Fails when a email is invalid', () => {
    const data = {
      date: 'due date',
      to: 'invalid email',
      body: 'email body',
      subject: 'subject',
    };

    const { valid, error } = validateFields(data);

    expect(valid).toBeFalsy();
    expect(error).toEqual('Invalid email');
  });
});
