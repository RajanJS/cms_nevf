const { Router } = require("express");

const router = Router();

// 308 Permanent Redirect (method + body not modified)
router.all("/contacts*", (req, res) => {
    res.redirect(308, `/api/v1${req.url}`);
});

// 308 Permanent Redirect (method + body not modified)
router.all("/users*", (req, res) => {
    res.redirect(308, `/api/v1${req.url}`);
});

exports.redirectRouter = {
    baseUrl: "/",
    router
};