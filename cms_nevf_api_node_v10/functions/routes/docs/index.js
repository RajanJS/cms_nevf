const { Router } = require("express");
const { SwaggerMiddleware } = require("../../middlewares");
console.log("SwaggerMiddleware", SwaggerMiddleware)

const swaggerMiddleware = new SwaggerMiddleware(
    "2.0.0",
    [
        {
            url: "http://localhost:3000/api/v1"
        }
    ],
    ["./config/*.js", "./routes/**/*.yaml"]
);

const router = Router();
router.use("/", swaggerMiddleware.swaggerUiHandlers());

// GET /api/docs/v1
router.get("/", swaggerMiddleware.swaggerUiMiddleware());

exports.routerV1Docs = {
    baseUrl: "/api/docs/v1",
    router
};