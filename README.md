[![Coverage Status](https://coveralls.io/repos/github/munala/lifego-api/badge.svg?branch=master)](https://coveralls.io/github/munala/lifego-api?branch=master)
[![CircleCI](https://circleci.com/gh/munala/lifego-api.svg?style=svg)](https://circleci.com/gh/munala/lifego-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/e085e754cbc827558383/maintainability)](https://codeclimate.com/github/munala/lifego-api/maintainability)

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


## Api documentation
[Click here][58286272]

  [58286272]: https://github.com/munala/email-scheduler/blob/master/docs/endpoints.md "Api Documentaion"
