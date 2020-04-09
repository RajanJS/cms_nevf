const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const app = express();

const { redirectRouter } = require('./routes/redirect.routes.js');
const { authRouter } = require('./routes/auth.router.js');
const { routerV1 } = require('./routes/v1');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors({ origin: "*" }));
app.use(helmet());

const router = express.Router();

/**
 *   Dummy route for test
 */
router.get('/', (req, res, next) => {
    res.json({
        message: `I'm OK! with v1.0.0`,
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

exports.app = functions.https.onRequest(app);
