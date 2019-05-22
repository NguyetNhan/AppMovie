/* eslint-disable indent */
import { FETCH_INFO_USER_FAILED, FETCH_INFO_USER_SUCCEEDED, LOGOUT_FAILED, LOGOUT_SUCCEEDED, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED, LIKE_FILM_SUCCEEDED, LIKE_FILM_FAILED } from '../actions/ActionTypes';

const ListFilmReducer = (state = [], action) => {
        switch (action.type) {
                case FETCH_FILM_SUCCEEDED:
                        return {
                                fetchFilm: action.film
                        };
                case FETCH_FILM_FAILED:
                        return action.error;
                case LIKE_FILM_SUCCEEDED:
                        return action.status;
                case LIKE_FILM_FAILED:
                        return action.error;
                case FETCH_INFO_USER_SUCCEEDED:
                        return {
                                fetchInfoLocal: action.user
                        };
                case FETCH_INFO_USER_FAILED:
                        return action.error;
                default:
                        return state;
        }
};

export default ListFilmReducer;







