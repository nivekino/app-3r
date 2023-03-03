const authMiddleware = require('./auth');
const bodyParser = require('body-parser');

/**
 * This function sets up the middleware for the Express app.
 * @param app - The express app object
 */
const setupMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  authMiddleware.init();
};

exports.setupMiddleware = setupMiddleware;
