const config = require('../config');
const { redirectRouter } = require('./redirect.routes.js');
const { authRouter } = require('./auth.router.js');
const { routerV1 } = require('./v1');
const { routerV1Docs } = require('./docs');

let BASE_URL = config.app.baseURL;

module.exports = function (app, router) {

    /**
     * Primary app routes.
    */
    app.use(BASE_URL, router);


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

    /**
     *   Users and Contacts routes
     */
    app.use(routerV1Docs.baseUrl, routerV1Docs.router);

};