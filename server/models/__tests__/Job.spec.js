const { jobs: Job } = require('../');

const { attributes } = Job;

describe('Job model tests', () => {
  test('Contains all attributes', () => {
    expect(attributes).toHaveProperty('id');
    expect(attributes).toHaveProperty('date');
    expect(attributes).toHaveProperty('to');
    expect(attributes).toHaveProperty('body');
    expect(attributes).toHaveProperty('finished');
    expect(attributes).toHaveProperty('createdAt');
    expect(attributes).toHaveProperty('updatedAt');
  });
});
