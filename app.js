import { getHome } from './controllers/home-controller.js';
import { getRegister, postRegister, getLogin, postLogin, getLogout } from './controllers/users-controller.js';
import { getAddMovie, postAddMovie, getLikeMovie, getEditMovie, postEditMovie, getDeleteMovie, getMovieDetails, getSearch } from './controllers/movies-controller.js';
import { setAuth } from './services/users-service.js';

const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.get('/', (ctx) => {
        setAuth.call(ctx);
        getHome.call(ctx);
    });

    this.get('/register', (ctx) => {
        setAuth.call(ctx);
        getRegister.call(ctx);
    });
    this.post('/register', (ctx) => {
        setAuth.call(ctx);
        postRegister.call(ctx);
    });

    this.get('/login', (ctx) => {
        setAuth.call(ctx);
        getLogin.call(ctx);
    });
    this.post('/login', (ctx) => {
        setAuth.call(ctx);
        postLogin.call(ctx);
    });

    this.get('/logout', (ctx) => {
        setAuth.call(ctx);
        getLogout.call(ctx);
    });

    this.get('/add-movie', (ctx) => {
        setAuth.call(ctx);
        getAddMovie.call(ctx);
    });
    this.post('/add-movie', (ctx) => {
        setAuth.call(ctx);
        postAddMovie.call(ctx);
    });

    this.get('/movie-details/:id', (ctx) => {
        setAuth.call(ctx);
        getMovieDetails.call(ctx);
    });

    this.get('/like-movie/:id', (ctx) => {
        setAuth.call(ctx);
        getLikeMovie.call(ctx);
    });

    this.get('/edit-movie/:id', (ctx) => {
        setAuth.call(ctx);
        getEditMovie.call(ctx);
    });
    this.post('/edit-movie/:id', (ctx) => {
        setAuth.call(ctx);
        postEditMovie.call(ctx);
    });

    this.get('/delete-movie/:id', (ctx) => {
        setAuth.call(ctx);
        getDeleteMovie.call(ctx);
    });

    this.get('/search', (ctx) => {
        setAuth.call(ctx);
        getSearch.call(ctx);
    });
});

app.run();