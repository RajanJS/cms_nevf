const { AuthController } = require("../../controllers");
// console.log("AuthController", AuthController)
const { AsyncWrapper, UserRoles } = require("../../utils");
const { ConfigService } = require("../../services");
const { AuthMiddleware } = require("../../middlewares");

module.exports = router => {
    const authController = new AuthController();

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