const services = require("../services");
const firebaseService = services.FirebaseService;
const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};

const checkIfAuthenticated = (req, res, next) => {
    return getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            if (!authToken) throw new Error('You are not authorized to make this request');

            const userInfo = await firebaseService.admin.auth().verifyIdToken(authToken);

            req.authId = userInfo.uid;
            return next();
        } catch (e) {
            return res
                .status(401)
                .send({ message: 'You are not authorized to make this request' });
        }
    })

}

/**
*
* @param {string or array} roles
* roles param can be a single role string (e.g. Role.User or 'User')
* or an array of roles (e.g. ['Admin', 'User'])
*/
const authorize = (roles = []) => {

    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;

            if (!authToken) throw new Error('You are not authorized to make this request');

            const userInfo = await firebaseService.admin.auth().verifyIdToken(authToken);

            if (userInfo) {
                req.authId = userInfo.uid;
                if (roles.length && !roles.includes(userInfo.role)) {
                    // user's role is not authorized
                    throw new Error('You are not authorized to make this request')
                }

                // authentication and authorization successful
                return next();
            }

            throw new Error('You are not authorized to make this request')

        } catch (e) {
            return res
                .status(401)
                .send({ message: e.message ? e.message : 'You are not authorized to make this request' });
        }
    });
}

module.exports = {
    getAuthToken,
    authorize,
    checkIfAuthenticated
}