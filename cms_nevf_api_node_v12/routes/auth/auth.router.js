import { Router } from "express";
import { AuthController } from "../../controllers";
import { AsyncWrapper, UserRoles } from "../../utils";
import { AuthMiddleware } from "../../middlewares";

const router = Router();
const authController = new AuthController();

// POST /auth/register
router.post(
    "/register",
    AsyncWrapper(authController.createUser.bind(authController))
);

// POST /auth/authenticate
router.post(
    "/authenticate",
    AsyncWrapper(authController.loginUser.bind(authController))
);

export const authRouter = {
    baseUrl: "/auth",
    router
};