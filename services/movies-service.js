export async function addMovie(movie) {
    return await firebase.firestore().collection('movies').add(movie);
}

export async function getMovie(id) {
    return await firebase.firestore().collection('movies').doc(id).get();
}

export async function getAll() {
    return await firebase.firestore().collection('movies').get();
}

export async function deleteMovie(id) {
    return await firebase.firestore().collection('movies').doc(id).delete();
}

export async function editMovie(id, movie) {
    return await firebase.firestore().collection('movies').doc(id).update(movie);
}
