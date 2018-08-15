/* eslint-disable no-useless-escape */

module.exports = (data) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let response = { valid: true };

  const keys = ['date', 'to', 'body', 'subject'];

  keys.every((key) => {
    if (!Object.keys(data).includes(key)) {
      response = {
        valid: false,
        error: `Missing ${key}.`,
      };

      return false;
    }

    return true;
  });


  if (response.error) {
    return response;
  }

  Object.keys(data).every((key) => {
    if (key === 'to' && !re.test(data.to)) {
      response = {
        valid: false,
        error: 'Invalid email',
      };

      return false;
    }

    if (!data[key]) {
      response = {
        valid: false,
        error: `Empty ${key}.`,
      };

      return false;
    }

    return true;
  });

  return response;
};
