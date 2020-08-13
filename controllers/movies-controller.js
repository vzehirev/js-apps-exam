import partials from '../config/partials-paths.js';
import { addMovie, getAll, getMovie, editMovie, deleteMovie } from '../services/movies-service.js';
import { errorNotification, successNotification } from '../notifications-handler.js';

export function getAddMovie() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    this.loadPartials(partials)
        .partial('./views/add-movie.hbs');
}

export async function postAddMovie() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    const { title, description, imageUrl } = this.params;

    if (!title || !description || !imageUrl) {
        errorNotification('Title, description and image URL must not be empty!');
        return;
    }

    const movie = {
        title,
        description,
        imageUrl,
        creator: sessionStorage.getItem('user'),
        peopleLiked: []
    };

    try {
        await addMovie(movie);
    } catch (e) {
        alert(e);
        return;
    }

    successNotification('Created successfully!');

    setTimeout(() => {
        this.redirect('/');
    }, 1500);
}

export async function getMovieDetails() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    try {
        var movie = await getMovie(this.params.id);
    } catch (e) {
        alert(e);
        return;
    }

    this.movie = { id: movie.id, ...movie.data() };
    this.isCreator = this.movie.creator === sessionStorage.getItem('user');
    if (!this.isCreator) {
        this.canLike = !this.movie.peopleLiked
            .includes(sessionStorage.getItem('user'));
    }
    this.movie.peopleLiked = this.movie.peopleLiked.length;

    this.loadPartials(partials).partial('./views/movie-details.hbs');
}

export async function getLikeMovie() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    try {
        var movie = await getMovie(this.params.id);
    } catch (e) {
        alert(e);
        return;
    }

    movie = movie.data();
    movie.peopleLiked.push(sessionStorage.getItem('user'));

    try {
        await editMovie(this.params.id, { ...movie });
    } catch (e) {
        alert(e);
        return;
    }

    successNotification('Liked successfully!');

    setTimeout(() => {
        this.redirect(`#/movie-details/${this.params.id}`);
    }, 1500);
}

export async function getEditMovie() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    try {
        var movie = await getMovie(this.params.id);
    } catch (e) {
        alert(e);
    }

    this.movie = { id: movie.id, ...movie.data() };

    this.loadPartials(partials).partial('./views/edit-movie.hbs');
}

export async function postEditMovie() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    const { title, description, imageUrl } = this.params;

    if (!title || !description || !imageUrl) {
        errorNotification('Title, description and image URL must not be empty!');
        return;
    }

    try {
        await editMovie(this.params.id, { ...this.params });
    } catch (e) {
        alert(e);
    }

    successNotification('Edited successfully!');

    setTimeout(() => {
        this.redirect(`#/movie-details/${this.params.id}`);
    }, 1500);
}

export async function getDeleteMovie() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    try {
        await deleteMovie(this.params.id);
    } catch (error) {
        alert(error);
    }

    successNotification('Deleted successfully!');

    setTimeout(() => {
        this.redirect('/');
    }, 1500);
}

export async function getSearch() {
    if (!this.isAuth) {
        this.redirect('/');
        return;
    }

    try {
        var movies = await getAll();
    } catch (e) {
        alert(e);
    }

    this.movies = movies.docs
        .map(x => x = { id: x.id, ...x.data() });

    this.movies = this.movies
        .filter(x => x.title.includes(this.params.searchTerm));

    this.noMovies = this.movies.length === 0;


    this.loadPartials(partials).partial('./views/home.hbs');
}