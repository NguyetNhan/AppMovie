import { FETCH_LIKE_FILM_SUCCEEDED, FETCH_LIKE_FILM_FAILED } from '../actions/Actions';

const DetailFilm = (state = [], action) => {
        switch (action.type) {
                case FETCH_LIKE_FILM_SUCCEEDED:
                        return action.movie;
                case FETCH_LIKE_FILM_FAILED:
                        return action.error;
                default:
                        return state;
        }
};

export default DetailFilm;