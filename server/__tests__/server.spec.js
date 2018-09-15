const supertest = require('supertest');
const express = require('express');
const http = require('http');

const initServer = require('../');

const app = express();
const server = http.Server(app);
const testApp = initServer(app, server);
const agent = supertest.agent(testApp);

const Job = require('../models').jobs;

jest.mock('amqplib/callback_api', () => ({
  connect: (url, callback) => {
    callback(null, {
      on: () => {},
      createConfirmChannel: () => {},
    });
  },
}));

describe('Server tests', () => {
  beforeEach(() => {
    process.env.AUTH_TOKEN = 'token';
  });

  test('Should send request and receive response', (done) => {
    const body = {
      to: 'test@existing.com',
      date: '"2018-08-15 20:18:00+03"',
      subject: 'subject',
      body: 'body',
      bucketlistId: 'sfdsfsdffse',
      jobId: null,
    };

    agent.post('/schedule')
      .set('token', process.env.AUTH_TOKEN)
      .send(body)
      .expect(201)
      .end((error, result) => {
        expect(result.body.to).toEqual(body.to);
        done();
      });
  });

  afterEach(async (done) => {
    await Job.destroy({ where: {} });

    done();
  });
});
