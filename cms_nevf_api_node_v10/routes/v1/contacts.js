// use aliases to avoid name conflicts
const { ContactsController } = require("../../controllers");
const { AsyncWrapper, UserRoles } = require("../../utils");
const { AuthMiddleware } = require("../../middlewares");
const cors = require('cors');

const whitelist = "";
const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports = router => {

    const contactsController = new ContactsController();
    // GET /api/v1/contacts
    router.get(
        "/contacts",
        (res, req, next) => cors(corsOptionsDelegate)(res, req, next),
        AuthMiddleware.authorize([UserRoles.Admin, UserRoles.Normal]),
        AsyncWrapper(contactsController.getContacts.bind(contactsController))
    );

    // GET /api/v2/contacts/full
    // router.get("/contacts/full", AsyncWrapper(contactsController.getContacts.bind(contactsController)));

    // GET /api/v1/contacts/:id
    router.get(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin, UserRoles.Normal]),
        AsyncWrapper(contactsController.getContact.bind(contactsController))
    );

    // POST /api/v1/contacts
    router.post(
        "/contacts",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(contactsController.postContact.bind(contactsController))
    );

    // PUT /api/v1/contacts/:id
    router.put(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(contactsController.putContact.bind(contactsController))
    );

    // DELETE /api/v1/contacts/:id
    router.delete(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(contactsController.deleteContact.bind(contactsController))
    );

    // DELETE /api/v1/contacts
    router.delete(
        "/contacts",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(contactsController.deleteAllContact.bind(contactsController))
    );
};