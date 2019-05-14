import { LIKE_FILM_DETAIL, FETCH_LIKE_FILM, FETCH_LIKE_FILM_SUCCEEDED, FETCH_LIKE_FILM_FAILED } from './Actions';

export const onLikeFilm = (value) => {
        return {
                type: LIKE_FILM_DETAIL,
                value
        };
};

export const onFetchLikeFilm = (value) => {
        return {
                type: FETCH_LIKE_FILM,
                value
        };
};

export const fetchLikeFilmSucceeded = (movie) => {
        return {
                type: FETCH_LIKE_FILM_SUCCEEDED,
                movie
        };
};

export const fetchLikeFilmFailed = (error) => {
        return {
                type: FETCH_LIKE_FILM_FAILED,
                error
        };
};
