import { AuthController } from "../../controllers";
import { CorsConfig } from "../../config";
import { AsyncWrapper, UserRoles } from "../../utils";
import { ConfigService } from "../../services";
import { AuthMiddleware } from "../../middlewares";

export default router => {
    const authController = new AuthController();
    const corsConf = new CorsConfig(ConfigService.get("CORS_WHITELIST"));

    router.post(
        "/users",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(authController.createUser.bind(authController))
    );

    router.get(
        "/users",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(authController.getUsers.bind(authController))
    );

    router.get(
        "/users/:id",
        AuthMiddleware.authorize([UserRoles.Admin, UserRoles.Normal]),
        AsyncWrapper(authController.getUser.bind(authController))
    );

    router.put(
        "/users/:id",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(authController.updateUser.bind(authController))
    );

    router.delete(
        "/users/:id",
        AuthMiddleware.authorize([UserRoles.Admin]),
        AsyncWrapper(authController.deleteUser.bind(authController))
    );
}