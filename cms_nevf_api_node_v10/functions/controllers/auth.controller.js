const UserAuthService = require("../services/auth/users-auth.service");
const { errorHandler } = require('../utils');


module.exports = function UserAuthController() {

    this.userAuthService = new UserAuthService();

    this.createUser = async function (req, res, next) {
        const user = await this.userAuthService.createUser(req.body);
        return res.json({
            userInfo: user
        });
    };

    this.loginUser = async function (req, res, next) {
        const { email, password } = req.body;
        const userInfo = await this.userAuthService.loginUser(email, password, next);

        if (userInfo) {
            return res.status(userInfo ? 200 : 401).json({
                ...(userInfo
                    ? { userInfo: userInfo }
                    : { message: "Authentication failed" })
            });
        }
        return null;
    };

    this.getUser = async function (req, res, next) {
        let uid = req.params.id;
        let email = req.body.email;
        let userInfo;

        if (!uid && !email) {
            return next(errorHandler("Please enter uid or email", 422));
        }

        if (uid) {
            userInfo = await this.userAuthService.getUser(uid, next);
        }

        if (!uid & email) {
            userInfo = await this.userAuthService.getUserByEmail(uid);
        }

        res.status(userInfo ? 200 : 401).json({
            ...(userInfo
                ? userInfo
                : { message: "You are not authorized to make this request" })
        });
    };

    this.getUsers = async function (req, res, next) {

        const userId = req.headers.uid;
        const users = await this.userAuthService.getUsers(userId);

        res.status(users ? 200 : 401).json({
            ...(users
                ? {
                    users: users
                }
                : { message: "You are not authorized to make this request" })
        });
    }

    this.updateUser = async function (req, res, next) {
        let uid = req.params.id;
        let updatedData = req.body;

        uid || next(errorHandler("Please enter a user id", 422));

        updatedData || next(errorHandler("Invalid data", 422));

        const user = await this.userAuthService.updateUser(uid, req.body);
        return res.json({ user });
    };

    this.deleteUser = async function (req, res, next) {

        const uid = req.params.id;
        uid || next(errorHandler("Please enter a user id", 422));

        const result = await this.userAuthService.deleteUser(uid, next);

        result ? res.json({ message: "User deleted" })
            : next(errorHandler("No data deleted"));
    };
}