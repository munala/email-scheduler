const express = require('express');
const http = require('http');
const initServer = require('./server');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3003;

initServer(app);

server.listen(port, () => {
  console.log(`Running on PORT: ${port}`); // eslint-disable-line no-console
});

module.exports = app;
