const { Router } = require("express");
const controller = require("../controllers");
const { AsyncWrapper, UserRoles } = require('../utils');

const router = Router();
const authController = new controller.AuthController();

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

exports.authRouter = {
    baseUrl: "/auth",
    router
};