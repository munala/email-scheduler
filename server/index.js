const bodyParser = require('body-parser');
const cors = require('cors');
const cache = require('memory-cache');
const rabbit = require('./rabbitMQ');
const controllers = require('./controllers');
const { verifyToken } = require('./middleware');
const { scheduleAll } = require('./lib');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  scheduleAll(cache);

  app.set('cache', cache);

  rabbit((publishData) => {
    app.set('publishData', publishData);
  });

  app.use(verifyToken);

  app.post('/schedule', controllers.schedule);
  app.put('/update/:jobId', controllers.update);
  app.delete('/cancel/:jobId', controllers.cancel);

  return app;
};
