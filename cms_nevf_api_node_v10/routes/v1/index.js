const Router = require("express");
const setContactsV1 = require("./contacts");
const setUsersV1 = require("./users");

const router = Router();

setContactsV1(router);
setUsersV1(router);

exports.routerV1 = {
    baseUrl: "/api/v1",
    router
};