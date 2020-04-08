import { apiHelper, handleResponse, requestOptions } from '@/_helpers';

const usersURL = '/api/v1/users';

export const userService = {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};

function registerUser(data) {
    return apiHelper(`${usersURL}`, requestOptions.post(data))
        .then(handleResponse).catch(handleResponse);
}

function getAllUsers() {
    return apiHelper(`${usersURL}`, requestOptions.get())
        .then(handleResponse).catch(handleResponse);
}

function getUserById(id) {
    return apiHelper(`${usersURL}/${id}`, requestOptions.get())
        .then(handleResponse).catch(handleResponse);
}

function updateUserById(id, data) {
    return apiHelper(`${usersURL}/${id}`, requestOptions.put(data))
        .then(handleResponse).catch(handleResponse);
}

function deleteUserById(id) {
    return apiHelper(`${usersURL}/${id}`, requestOptions.delete())
        .then(handleResponse).catch(handleResponse);
}