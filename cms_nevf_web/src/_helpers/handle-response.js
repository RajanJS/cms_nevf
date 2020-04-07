import { authService } from '@/_services';

export function handleResponse(res) {
    if (res && res.statusText != 'OK') {
        let errorResponse = res.response;
        if (errorResponse) {
            if ([401, 403].indexOf(errorResponse.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden res returned from api
                authService.logout();
                location.reload(true);
            }
            return Promise.reject(res);
        }
    }

    return res;
}