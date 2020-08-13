import partials from '../config/partials-paths.js';
import { getAll } from '../services/movies-service.js';

export async function getHome() {
    if (this.isAuth) {
        try {
            var movies = await getAll();
        } catch (e) {
            alert(e);
            return;
        }

        this.movies = movies.docs
            .map(x => x = { id: x.id, ...x.data() });

        this.noMovies = this.movies.length === 0;
    }

    this.loadPartials(partials).partial('./views/home.hbs');
}