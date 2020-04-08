import { Router } from "express";
import setContactsV1 from "./contacts";
import setUsersV1 from "./users";

const router = Router();

setContactsV1(router);
setUsersV1(router);

export const routerV1 = {
    baseUrl: "/api/v1",
    router
};