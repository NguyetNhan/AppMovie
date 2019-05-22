
import { ADD_COUNT_VIEW, FETCH_INFO_USER, FETCH_INFO_USER_SUCCEEDED, FETCH_INFO_USER_FAILED, LOGOUT, LIKE_FILM, FETCH_FILM, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED } from '../actions/ActionTypes';
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import { Local } from './StorageLocal';



function* updateViewMovie (action) {
        try {
                yield Local.onUpdateViewMovie(action.movie);
        } catch (error) {
                console.log('error updateViewMovie: ', error);
        }
}


function* fetchListFilmMovie (action) {
        try {
                if (action.value.network) {
                        var value = yield Api.listFilmFromApi(action.value.page);
                        console.log('value: ', value);
                        let movie_local = yield Local.onFetchMovieLocal(value);
                        console.log('movie_local: ', movie_local);
                        if (action.value.user != null) {
                                const listLike = yield Local.onListLikeMoveOfUser(action.value.user.id);
                                console.log('fetchListFilmMovie listLike: ', listLike);
                                if (listLike == null) {
                                        for (i = 0; i < movie_local.list_movie.length; i++) {
                                                movie_local.list_movie[i].liked = false;
                                                movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like.png');
                                                movie_local.list_movie[i].textButtonLike = 'Thích';
                                                movie_local.list_movie[i].colorTextLike = 'white';
                                        }
                                } else {
                                        for (i = 0; i < movie_local.list_movie.length; i++) {
                                                var checkMovieExist = false;
                                                for (j = 0; j < listLike.like.length; j++) {
                                                        if (movie_local.list_movie[i].id === listLike.like[j].movie) {
                                                                checkMovieExist = true;
                                                                if (listLike.like[j].status) {
                                                                        movie_local.list_movie[i].liked = listLike.like[j].status;
                                                                        movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like_orange.png');
                                                                        movie_local.list_movie[i].textButtonLike = 'Đã thích';
                                                                        movie_local.list_movie[i].colorTextLike = '#fd6003';
                                                                } else {
                                                                        movie_local.list_movie[i].liked = listLike.like[j].status;
                                                                        movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like.png');
                                                                        movie_local.list_movie[i].textButtonLike = 'Thích';
                                                                        movie_local.list_movie[i].colorTextLike = 'white';
                                                                }
                                                        }
                                                }
                                                if (!checkMovieExist) {
                                                        movie_local.list_movie[i].liked = false;
                                                        movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like.png');
                                                        movie_local.list_movie[i].textButtonLike = 'Thích';
                                                        movie_local.list_movie[i].colorTextLike = 'white';
                                                }
                                        }
                                }
                        } else {
                                for (i = 0; i < movie_local.list_movie.length; i++) {
                                        movie_local.list_movie[i].liked = false;
                                        movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like.png');
                                        movie_local.list_movie[i].textButtonLike = 'Thích';
                                        movie_local.list_movie[i].colorTextLike = 'white';
                                }
                        }
                        let movie = {
                                'error': value.error,
                                'code': value.code,
                                'message': value.message,
                                'paging': value.paging,
                                'data': movie_local.list_movie
                        };

                        yield put({ type: FETCH_FILM_SUCCEEDED, film: movie });
                } else {
                        let movie_local = yield Local.onFetchMovieOffline();
                        if (action.value.user != null) {
                                const listLike = yield Local.onListLikeMoveOfUser(action.value.user.id);
                                console.log('fetchListFilmMovie listLike: ', listLike);
                                if (listLike == null) {
                                        for (i = 0; i < movie_local.list_movie.length; i++) {
                                                movie_local.list_movie[i].liked = false;
                                                movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like.png');
                                                movie_local.list_movie[i].textButtonLike = 'Thích';
                                                movie_local.list_movie[i].colorTextLike = 'white';
                                        }
                                } else {
                                        for (i = 0; i < movie_local.list_movie.length; i++) {
                                                let checkMovieExist = false;
                                                for (j = 0; j < listLike.like.length; j++) {
                                                        if (movie_local.list_movie[i].id === listLike.like[j].movie) {
                                                                checkMovieExist = true;
                                                                if (listLike.like[j].status) {
                                                                        movie_local.list_movie[i].liked = listLike.like[j].status;
                                                                        movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like_orange.png');
                                                                        movie_local.list_movie[i].textButtonLike = 'Đã thích';
                                                                        movie_local.list_movie[i].colorTextLike = '#fd6003';
                                                                } else {
                                                                        movie_local.list_movie[i].liked = listLike.like[j].status;
                                                                        movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like.png');
                                                                        movie_local.list_movie[i].textButtonLike = 'Thích';
                                                                        movie_local.list_movie[i].colorTextLike = 'white';
                                                                }
                                                        }
                                                }
                                                if (!checkMovieExist) {
                                                        movie_local.list_movie[i].liked = false;
                                                        movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like.png');
                                                        movie_local.list_movie[i].textButtonLike = 'Thích';
                                                        movie_local.list_movie[i].colorTextLike = 'white';
                                                }
                                        }
                                }
                        } else {
                                for (i = 0; i < movie_local.list_movie.length; i++) {
                                        movie_local.list_movie[i].liked = false;
                                        movie_local.list_movie[i].urlImageLike = require('../../../assets/images/ic_like.png');
                                        movie_local.list_movie[i].textButtonLike = 'Thích';
                                        movie_local.list_movie[i].colorTextLike = 'white';
                                }
                        }
                        let movie = {
                                'data': movie_local.list_movie
                        };

                        yield put({ type: FETCH_FILM_SUCCEEDED, film: movie });
                }


        } catch (error) {
                yield put({ type: FETCH_FILM_FAILED, error: error });
        }
}

function* onUserLike (action) {
        try {
                yield Local.onLike(action.value);
        } catch (error) {
                console.log(error);
        }
}

function* onLogoutUser (action) {
        try {
                //  console.log('action: ', action.value);
                yield Api.logoutFromApi(action.value);
                yield Local.onLogoutLocal();
        } catch (error) {
                console.error('error onLogoutUser : ', error);
        }
}

function* onFetchInfoUser (action) {
        try {
                let result = yield Local.onFetchUser();
                // console.log('result onFetchInfoUser : ', result);
                yield put({ type: FETCH_INFO_USER_SUCCEEDED, user: result });
        } catch (error) {
                yield put({ type: FETCH_INFO_USER_FAILED, error: error });
        }
}



export function* watchFetchListFilm () {
        yield takeLatest(FETCH_FILM, fetchListFilmMovie);
}

export function* watchOnUserLike () {
        yield takeLatest(LIKE_FILM, onUserLike);
}

export function* watchLogout () {
        yield takeLatest(LOGOUT, onLogoutUser);
}

export function* watchFetchInfoUser () {
        yield takeLatest(FETCH_INFO_USER, onFetchInfoUser);
}

export function* watchOnUpdateViewMovie () {
        yield takeLatest(ADD_COUNT_VIEW, updateViewMovie);
}


