import ConfigService from "../config.service";
import FirebaseService from '../firebase.service';
import { UserRoles, errorHandler } from '../../utils';

export default class UserAuthService {
    #configService;
    #firebaseService;

    constructor() {
        this.#firebaseService = FirebaseService;
        this.#configService = ConfigService;

    }

    /**
     *
     * @param {*} user
     */
    async createUser(user) {
        if (!user || !user.email || !user.password || !user.firstName) throw new Error("Please provide valid user");
        if (!user.isAdmin && !user.userId) throw new Error("Please provide valid user");

        const usr = user;
        usr.displayName = `${user.firstName} ${user.lastName}`;

        const insertedUser = await this.#firebaseService.admin.auth().createUser(usr);
        const customClaims = {
            role: UserRoles.Normal
        };

        if (usr.isAdmin) {
            customClaims.role = UserRoles.Admin;
        }

        if (usr.userId) {
            customClaims.userId = usr.userId;
        }

        await this.#firebaseService.admin.auth().setCustomUserClaims(insertedUser.uid, customClaims);

        return insertedUser;

    }

    /**
     *
     * @param {string} email
     * @param {string} password
     */
    async loginUser(email, password, next) {

        if (!email | !password) return null;

        // const user = await firebaseService.admin.auth().getUserByEmail(email);

        return this.#firebaseService.client.auth().signInWithEmailAndPassword(email, password).then(function (user) {
            return user;
        }).catch(function (error) {
            return next(errorHandler(error.message));
        });

        // return loggedIn;
    }

    /**
    *
    * @param {String} uid
    */
    async getUser(uid) {

        if (!uid) return null;

        const userInfo = await this.#firebaseService.admin.auth().getUser(uid);

        return userInfo;
    }

    /**
    *
    * @param {String} uid
    */
    async getUserByEmail(email) {

        if (!email) return null;

        const userInfo = await this.#firebaseService.admin.auth().getUserByEmail(email);

        return userInfo;
    }

    /**
    *
    * @param {String} uid
    */
    async updateUser(uid, updatedData) {

        if (!updatedData) return null;

        const userInfo = await this.#firebaseService.admin.auth().updateUser(uid, updatedData);

        return userInfo;
    }

    /**
    *
    * @param {String} uid
    * @param {import("express").NextFunction} next
    */
    async deleteUser(uid, next) {

        return this.#firebaseService.admin.auth().deleteUser(uid).then(function () {
            return true;
        }).catch(function (error) {
            return next(errorHandler(error.message));
        });

    }

    /**
     *
     * @param {object} req
     */
    async getUsers(userId) {

        const filteredUsers = [];
        await this.#firebaseService.admin.auth().listUsers()
            .then(function (listUsersResult) {
                listUsersResult.users.forEach(function (userRecord) {
                    let user = userRecord.toJSON();
                    if (user.customClaims.userId == userId) filteredUsers.push(user)
                });
            })
            .catch(function (error) {
                return next(errorHandler(error.message, 500));
            });

        return filteredUsers;
    }


}