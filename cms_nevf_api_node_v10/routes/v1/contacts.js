// use aliases to avoid name conflicts
import { contacts as v1 } from "../../controllers";
import { CorsConfig } from "../../config";
import { AsyncWrapper, UserRoles } from "../../utils";
import { ConfigService } from "../../services";
import { AuthMiddleware } from "../../middlewares";

export default router => {
    const corsConf = new CorsConfig(ConfigService.get("CORS_WHITELIST"));

    // GET /api/v1/contacts
    router.get(
        "/contacts",
        (res, req, next) => corsConf.setAsyncConfig()(res, req, next),
        AuthMiddleware.authorize([UserRoles.Admin, UserRoles.Normal]),
        AsyncWrapper(v1.getContacts)
    );

    // GET /api/v2/contacts/full
    // router.get("/contacts/full", AsyncWrapper(v1.getContacts));

    // GET /api/v1/contacts/:id
    router.get(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin, UserRoles.Normal]),
        AsyncWrapper(v1.getContact)
    );

    // POST /api/v1/contacts
    router.post(
        "/contacts",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(v1.postContact)
    );

    // PUT /api/v1/contacts/:id
    router.put(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(v1.putContact)
    );

    // DELETE /api/v1/contacts/:id
    router.delete(
        "/contacts/:id",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(v1.deleteContact)
    );

    // DELETE /api/v1/contacts
    router.delete(
        "/contacts",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(v1.deleteAllContact)
    );
};