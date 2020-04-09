const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const chalk = require('chalk');
const PORT = 5555;
const app = express();

const { redirectRouter } = require('./routes/redirect.routes.js');
const { authRouter } = require('./routes/auth.router.js');
const { routerV1 } = require('./routes/v1');

app.set('port', PORT);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors({ origin: "*" }));
app.use(helmet());

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        message: `I'm OK! v1.0.2`,
    });
});

app.use('/', router);


/**
 *   Redirect routes
 */
app.use(redirectRouter.baseUrl, redirectRouter.router);

/**
 *   Auth routes
 */
app.use(authRouter.baseUrl, authRouter.router);

/**
 *   Users and Contacts routes
 */
app.use(routerV1.baseUrl, routerV1.router);

app.listen(PORT, () => {
    console.log(`%s Serving API at:%d in %s mode`, chalk.green('✓'), PORT, 'dev');
    console.log('Press CTRL-C to stop\n');
});

exports.app = functions.https.onRequest(app);
