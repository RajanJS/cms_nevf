import { authService } from '@/_services';

export const requestOptions = {
    get() {
        return {
            method: 'GET',
            ...headers()
        };
    },
    post(data) {
        return {
            method: 'POST',
            ...headers(),
            data: data
        };
    },
    patch(data) {
        return {
            method: 'PATCH',
            ...headers(),
            data: data
        };
    },
    put(data) {
        return {
            method: 'PUT',
            ...headers(),
            data: data
        };
    },
    delete() {
        return {
            method: 'DELETE',
            ...headers()
        };
    }
}

function headers() {
    const currentUser = authService.currentUserValue || {};
    const authHeader = currentUser.token ? { 'Authorization': 'Bearer ' + currentUser.token } : {};
    const ids = {};
    if (currentUser.uid) ids.uid = currentUser.uid;
    if (currentUser.userId) ids.userId = currentUser.userId;

    return {
        headers: {
            ...ids,
            ...authHeader,
            // 'Access-Control-Allow-Origin': '*'
        }
    }
}