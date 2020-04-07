import { apiHelper, handleResponse, requestOptions } from '@/_helpers';
import { BehaviorSubject } from 'rxjs';
import { firebaseAuth } from "@/firebase/firebase.utils";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const authURL = '/auth';

export const authService = {
    login,
    logout,
    loginServer,
    registerUser,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
    updateLocalStorage,
    updatePassword
};

function registerUser(data) {

    return apiHelper(`${authURL}/register`, requestOptions.post(data)).then(async response => {
        // login user after register
        if (response) {
            return login(data.email, data.password);
        }
        return response;
    });
}
function loginServer(data) {
    return apiHelper(`${authURL}/authenticate`, requestOptions.post(data))
        .then(handleResponse)
        .then(user => user);
}
async function login(email, password) {
    return firebaseAuth
        .signInWithEmailAndPassword(email, password).then(async response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            await updateLocalStorage(response.user)
            return response;
        });
}

async function updateLocalStorage(newUser) {

    if (newUser) {
        // let token = await firebaseAuth.currentUser.getIdToken();
        let currentUser = {
            token: newUser.xa,
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName
        }
        let userInfo = await apiHelper({
            method: "get",
            url: `api/v1/users/${currentUser.uid}`,
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        })
        if (userInfo.status == 200 && userInfo && userInfo.data && userInfo.data.customClaims) {
            let userData = userInfo.data;
            currentUser.role = userData.customClaims.role;
            currentUser.userId = userData.customClaims.userId;
            currentUser.firstName = userData.displayName.split(" ")[0];
            currentUser.LastName = userData.displayName.split(" ")[1];
        }
        await localStorage.setItem('currentUser', JSON.stringify(currentUser));
        currentUserSubject.next(currentUser);
    }

}

function logout() {
    // remove user from local storage to log user out
    return firebaseAuth
        .signOut()
        .then(() => {
            localStorage.removeItem('currentUser');
            currentUserSubject.next(null);
        })
        .catch(err => err);

}
function updatePassword(newPassword) {
    return firebaseAuth.currentUser.updatePassword(newPassword);
}
