import partials from '../config/partials-paths.js';
import { registerUser, loginUser, logoutUser, checkUserCredentials } from '../services/users-service.js';
import { successNotification, errorNotification } from '../notifications-handler.js';

export function getRegister() {
    if (this.isAuth) {
        this.redirect('/');
        return;
    }

    this.loadPartials(partials).partial('./views/register.hbs');
}

export async function postRegister() {
    if (this.isAuth) {
        this.redirect('/');
        return;
    }

    if (!this.params.email
        || this.params.password.length < 6
        || this.params.password !== this.params.repeatPassword) {
        errorNotification('You should enter valid e-mail, password with at least 6 characaters and both passwords should be the same!');
        return;
    }

    try {
        await registerUser(this.params.email, this.params.password);
    } catch (e) {
        alert(e);
        return;
    }

    loginUser(this.params.email);

    successNotification('Successful registration!');

    setTimeout(() => {
        this.redirect('/');
    }, 1500);
}

export function getLogin() {
    if (this.isAuth) {
        this.redirect('/');
        return;
    }

    this.loadPartials(partials).partial('./views/login.hbs');
}

export async function postLogin() {
    if (this.isAuth) {
        this.redirect('/');
        return;
    }

    try {
        await checkUserCredentials(this.params.email, this.params.password);
    } catch (e) {
        alert(e);
        return;
    }

    loginUser(this.params.email);

    successNotification('Logged in successfully!');

    setTimeout(() => {
        this.redirect('/');
    }, 1500);
}

export function getLogout() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    logoutUser();

    successNotification('Logout successful!');

    setTimeout(() => {
        this.redirect('/');
    }, 1500);
}