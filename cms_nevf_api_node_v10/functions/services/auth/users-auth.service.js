
const FirebaseService = require('../../services/firebase.service');
const { UserRoles, errorHandler } = require('../../utils');

module.exports = function UserAuthService() {

    this.firebaseService = FirebaseService;
    /**
     *
     * @param {*} user
     */
    this.createUser = async function (user) {
        try {
            // if (!user || !user.email || !user.password || !user.firstName) throw new Error("Please provide valid user");
            // if (!user.isAdmin && !user.userId) throw new Error("Please provide valid user");

            const usr = user;
            usr.displayName = `${user.firstName} ${user.lastName}`;

            const insertedUser = await this.firebaseService.admin.auth().createUser(usr).then(async (response) => {
                if (response) {
                    let customClaims = {
                        role: UserRoles.Normal
                    };

                    if (usr.isAdmin) {
                        customClaims.role = UserRoles.Admin;
                    }

                    if (usr.userId) {
                        customClaims.userId = usr.userId;
                    }

                    await this.firebaseService.admin.auth().setCustomUserClaims(response.uid, customClaims);
                }

                return response;
            });
            return insertedUser;

        } catch (error) {
            return errorHandler(error.message ? error.message : 'Network Error', 400);
        }
    }

    /**
     *
     * @param {string} email
     * @param {string} password
     */
    this.loginUser = async function (email, password, next) {

        if (!email | !password) return null;

        // const user = await this.firebaseService.admin.auth().getUserByEmail(email);

        return this.firebaseService.client.auth().signInWithEmailAndPassword(email, password).then(function (user) {
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
    this.getUser = async function (uid) {

        if (!uid) return null;

        const userInfo = await this.firebaseService.admin.auth().getUser(uid);

        return userInfo;
    }

    /**
    *
    * @param {String} uid
    */
    this.getUserByEmail = async function (email) {

        if (!email) return null;

        const userInfo = await this.firebaseService.admin.auth().getUserByEmail(email);

        return userInfo;
    }

    /**
    *
    * @param {String} uid
    */
    this.updateUser = async function (uid, updatedData) {

        if (!updatedData) return null;

        const userInfo = await this.firebaseService.admin.auth().updateUser(uid, updatedData);

        return userInfo;
    }

    /**
    *
    * @param {String} uid
    * @param {import("express").NextFunction} next
    */
    this.deleteUser = async function (uid, next) {

        return this.firebaseService.admin.auth().deleteUser(uid).then(function () {
            return true;
        }).catch(function (error) {
            return next(errorHandler(error.message));
        });

    }

    /**
     *
     * @param {object} req
     */
    this.getUsers = async function (userId, next) {

        const filteredUsers = [];
        await this.firebaseService.admin.auth().listUsers()
            .then(function (listUsersResult) {
                return listUsersResult.users.forEach(function (userRecord) {
                    let user = userRecord.toJSON();
                    if (user.customClaims.userId === userId) filteredUsers.push(user)
                });
            })
            .catch(function (error) {
                return next(errorHandler(error.message, 500));
            });

        return filteredUsers;
    }


}