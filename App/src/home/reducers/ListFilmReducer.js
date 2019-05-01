import { LIKE_FILM, XEM_FILM, FETCH_FILM, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED } from '../actions/ActionTypes';

const ListFilmReducer = (state = [] , action) => {
    switch (action.type) {
        case FETCH_FILM_SUCCEEDED:
            return action.film
        case FETCH_FILM_FAILED:
            return action.error
        default:
            return state
    }
}

export default ListFilmReducer







