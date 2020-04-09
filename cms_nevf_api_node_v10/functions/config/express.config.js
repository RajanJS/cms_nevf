/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const chalk = require('chalk');
// const errorhandler = require('errorhandler')

module.exports = function (app, config, env) {
  app.set('port', config.app.port);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(cors({ origin: true }));
  app.use(helmet());



  /**
  * register the Express Error Handling middleware
  */
  if (process.env.NODE_ENV === 'dev') {
    // only use in development
    app.use(errorhandler())
  }


  /**
 * Create our Express router
 */
  const router = express.Router();

  /**
 * Initial dummy route for testing
 */
  router.get('/', (req, res) => {
    res.json({
      message: `OK!`,
    });
  });

  /**
   * Register all our routes with baseURL
   * Primary app routes.
   */
  require("../routes")(app, router);

  /**
    * Start Express server.
    */
  try {
    app.listen(app.get('port'), () => {
      console.log(`%s Serving API at http://${config.app.host}:%d in %s mode`, chalk.green('✓'), app.get('port'), env);
      console.log('Press CTRL-C to stop\n');
    });

  } catch (error) {
    console.error(` Error: ${error.message}`);
  }

}
