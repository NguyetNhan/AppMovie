import {FETCH_LIST_LIKE_FAILED,FETCH_LIST_LIKE_SUCCEEDED,FETCH_LIST_LIKE, LIKE_FILM, XEM_FILM, FETCH_FILM, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED,LIKE_FILM_SUCCEEDED,LIKE_FILM_FAILED } from './ActionTypes';

export const fetchFilm = (page,user) => {
    return {
        type: FETCH_FILM,
        page,
        user
    }
}

export const likeFilm = (movieLike) => {
    return {
        type: LIKE_FILM,
        movieLike
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

