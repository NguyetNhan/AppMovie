import {  LIKE_FILM,XEM_FILM,FETCH_FILM,FETCH_FILM_SUCCEEDED,FETCH_FILM_FAILED} from './ActionTypes';

export const fetchFilm = (page)=>{
    return{
        type:FETCH_FILM,
        page
    }
}

export const likeFilm = (film)=>{
    return{
        type:LIKE_FILM,
        film
    }
}

export const xemFilm = (film)=>{
    return{
        type:XEM_FILM,
        film
    }
}

export const fetchFilmSucceeded = (film)=>{
    return{
        type:FETCH_FILM_SUCCEEDED,
        film
    }
}


export const fetchFilmFailed = (error)=>{
    return{
        type:FETCH_FILM_FAILED,
        error
    }
}
