import {FETCH_LIST_LIKE_FAILED,FETCH_LIST_LIKE_SUCCEEDED,FETCH_LIST_LIKE, LIKE_FILM, XEM_FILM, FETCH_FILM, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED,LIKE_FILM_SUCCEEDED,LIKE_FILM_FAILED } from './ActionTypes';

export const fetchFilm = (value) => {
    return {
        type: FETCH_FILM,
        value
    }
}

export const likeFilm = (value) => {
    return {
        type: LIKE_FILM,
        value
    }
}

export const xemFilm = (film) => {
    return {
        type: XEM_FILM,
        film
    }
}

export const fetchListLike = (userId)=>{
    return {
        type:FETCH_LIST_LIKE,
        userId
    }
}


export const fetchFilmSucceeded = (film) => {
    return {
        type: FETCH_FILM_SUCCEEDED,
        film
    }
}


export const fetchFilmFailed = (error) => {
    return {
        type: FETCH_FILM_FAILED,
        error
    }
}

export const likeFilmSucceeded = (status) => {
    return {
        type: LIKE_FILM_SUCCEEDED,
        status
    }
}

export const likeFilmFailed = (error) => {
    return {
        type: LIKE_FILM_FAILED,
        error
    }
}

export const fetchListLikeSucceeded = (listLike)=>{
    return {
        type:FETCH_LIST_LIKE_SUCCEEDED,
        listLike
    }
}

export const fetchListLikeFailed = (error)=>{
    return {
        type:FETCH_LIST_LIKE_FAILED,
        error
    }
}

