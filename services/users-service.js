export async function registerUser(email, password) {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export async function loginUser(email) {
    sessionStorage.setItem('user', email);
}

export async function checkUserCredentials(email, password) {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logoutUser() {
    sessionStorage.clear();
}

export function setAuth() {
    if (sessionStorage.getItem('user')) {
        this.isAuth = true;
        this.user = sessionStorage.getItem('user');
    }
}
