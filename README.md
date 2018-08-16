[![Coverage Status](https://coveralls.io/repos/github/munala/email-scheduler/badge.svg?branch=master)](https://coveralls.io/github/munala/email-scheduler?branch=master)
[![CircleCI](https://circleci.com/gh/munala/email-scheduler.svg?style=svg)](https://circleci.com/gh/munala/email-scheduler)
[![Maintainability](https://api.codeclimate.com/v1/badges/a9b84e5bd39c7c6655e2/maintainability)](https://codeclimate.com/github/munala/email-scheduler/maintainability)

## Description
This is an API for scheduling emails. It is built using node `express`.

## Setup
This project relies on `node^8.9`, `postgres^9.4` to run. Make sure they are installed first.

Run the following commands to setup:

  `git clone https://github.com/munala/email-scheduler.git`

  `cd email-scheduler/`

  `createdb jobs_development`

  `createdb jobs_test`

  `npm install`

  `npm install -g sequelize sequelize-cli`

  `sequelize db:migrate`

Add the following environment variables:
  - `EMAIL_SENDER` - Email used by app to send emails.
  - `EMAIL_PASSWORD` - Password for the above email.
  - `AUTH_TOKEN` - Token that will be used to authenticate requests.

## Running
Run the following commands to run app:

  `node app.js`

## Testing
Run the following commands to test app:

  `npm test`

  or

  `npm run coverage` to run test and generate coverage.


## Api documentation
[Click here][58286272]

  [58286272]: https://github.com/munala/email-scheduler/blob/master/docs/endpoints.md "Api Documentaion"
