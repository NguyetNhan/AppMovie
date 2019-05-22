/* eslint-disable indent */
import { ADD_COUNT_VIEW, FETCH_USER_LOCAL_FAILED, FETCH_USER_LOCAL_SUCCEEDED, FETCH_USER_LOCAL, FETCH_INFO_USER_FAILED, FETCH_INFO_USER_SUCCEEDED, FETCH_INFO_USER, LOGOUT_FAILED, LOGOUT_SUCCEEDED, LOGOUT, FETCH_LIST_LIKE_FAILED, FETCH_LIST_LIKE_SUCCEEDED, FETCH_LIST_LIKE, LIKE_FILM, XEM_FILM, FETCH_FILM, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED, LIKE_FILM_SUCCEEDED, LIKE_FILM_FAILED } from './ActionTypes';

export const fetchFilm = (value) => {
        return {
                type: FETCH_FILM,
                value
        };
};

export const likeFilm = (value) => {
        return {
                type: LIKE_FILM,
                value
        };
};

/* export const xemFilm = (film) => {
        return {
                type: XEM_FILM,
                film
        };
}; */

export const fetchListLike = (userId) => {
        return {
                type: FETCH_LIST_LIKE,
                userId
        };
};


export const fetchFilmSucceeded = (film) => {
        return {
                type: FETCH_FILM_SUCCEEDED,
                film
        };
};


export const fetchFilmFailed = (error) => {
        return {
                type: FETCH_FILM_FAILED,
                error
        };
};

export const likeFilmSucceeded = (status) => {
        return {
                type: LIKE_FILM_SUCCEEDED,
                status
        };
};

export const likeFilmFailed = (error) => {
        return {
                type: LIKE_FILM_FAILED,
                error
        };
};

export const fetchListLikeSucceeded = (listLike) => {
        return {
                type: FETCH_LIST_LIKE_SUCCEEDED,
                listLike
        };
};

export const fetchListLikeFailed = (error) => {
        return {
                type: FETCH_LIST_LIKE_FAILED,
                error
        };
};

export const onLogout = (value) => {
        return {
                type: LOGOUT,
                value
        };
};

export const logoutSucceeded = (message) => {
        return {
                type: LOGOUT_SUCCEEDED,
                message
        };
};

export const logoutFailed = (error) => {
        return {
                type: LOGOUT_FAILED,
                error
        };
};

export const fetchInfoUser = () => {
        return {
                type: FETCH_INFO_USER,
        };
};

export const fetchInfoUserSucceeded = (user) => {
        return {
                type: FETCH_INFO_USER_SUCCEEDED,
                user
        };
};

export const fetchInfoUserFailed = (error) => {
        return {
                type: FETCH_INFO_USER_FAILED,
                error
        };
};

export const onAddCountView = (movie) => {
        return {
                type: ADD_COUNT_VIEW,
                movie
        };
};
