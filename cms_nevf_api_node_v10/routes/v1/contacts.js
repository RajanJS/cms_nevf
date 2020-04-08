// use aliases to avoid name conflicts
const { contacts } = require("../../controllers");
const { AsyncWrapper, UserRoles } = require("../../utils");
const { ConfigService } = require("../../services");
const { AuthMiddleware } = require("../../middlewares");

module.exports = router => {

    // GET /api/v1/contacts
    router.get(
        "/contacts",
        (res, req, next) => corsConf.setAsyncConfig()(res, req, next),
        AuthMiddleware.authorize([UserRoles.Admin, UserRoles.Normal]),
        AsyncWrapper(contacts.getContacts)
    );

    // GET /api/v2/contacts/full
    // router.get("/contacts/full", AsyncWrapper(contacts.getContacts));

    // GET /api/v1/contacts/:id
    router.get(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin, UserRoles.Normal]),
        AsyncWrapper(contacts.getContact)
    );

    // POST /api/v1/contacts
    router.post(
        "/contacts",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(contacts.postContact)
    );

    // PUT /api/v1/contacts/:id
    router.put(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(contacts.putContact)
    );

    // DELETE /api/v1/contacts/:id
    router.delete(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(contacts.deleteContact)
    );

    // DELETE /api/v1/contacts
    router.delete(
        "/contacts",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(contacts.deleteAllContact)
    );
};