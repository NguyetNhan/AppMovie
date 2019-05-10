import { FETCH_LIST_LIKE, FETCH_LIST_LIKE_FAILED, FETCH_LIST_LIKE_SUCCEEDED, LIKE_FILM, XEM_FILM, FETCH_FILM, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED } from '../actions/ActionTypes';

import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import { Local } from './StorageLocal';



function* fetchListFilmMovie(action) {
        try {
                var value = yield Api.listFilmFromApi(action.value.page);
                console.log('value: ', value);
                if (action.value.user != null) {
                        const listLike = yield Local.onListLikeMoveOfUser(action.value.user.id);
                        console.log('fetchListFilmMovie listLike: ', listLike);
                        if (listLike == null) {
                                for (i = 0; i < value.data.length; i++) {
                                        value.data[i].liked = false
                                        value.data[i].urlImageLike = require('../../../assets/images/ic_like.png')
                                        value.data[i].textButtonLike = 'Thích'
                                        value.data[i].colorTextLike = 'white'
                                }
                        } else {
                                for (i = 0; i < value.data.length; i++) {
                                        var checkMovieExist = false
                                        for (j = 0; j < listLike.like.length; j++) {
                                                if (value.data[i].id == listLike.like[j].movie) {
                                                        checkMovieExist = true
                                                        if (listLike.like[j].status) {
                                                                value.data[i].liked = listLike.like[j].status
                                                                value.data[i].urlImageLike = require('../../../assets/images/ic_like_orange.png')
                                                                value.data[i].textButtonLike = 'Đã thích'
                                                                value.data[i].colorTextLike = '#fd6003'
                                                        } else {
                                                                value.data[i].liked = listLike.like[j].status
                                                                value.data[i].urlImageLike = require('../../../assets/images/ic_like.png')
                                                                value.data[i].textButtonLike = 'Thích'
                                                                value.data[i].colorTextLike = 'white'

                                                        }
                                                }
                                        }
                                        if (!checkMovieExist) {
                                                value.data[i].liked = false
                                                value.data[i].urlImageLike = require('../../../assets/images/ic_like.png')

                                                value.data[i].textButtonLike = 'Thích'
                                                value.data[i].colorTextLike = 'white'
                                        }
                                }
                        }



                } else {
                        for (i = 0; i < value.data.length; i++) {
                                value.data[i].liked = false
                                value.data[i].urlImageLike = require('../../../assets/images/ic_like.png')
                                value.data[i].textButtonLike = 'Thích'
                                value.data[i].colorTextLike = 'white'
                        }
                }
                yield put({ type: FETCH_FILM_SUCCEEDED, film: value });
        } catch (error) {
                yield put({ type: FETCH_FILM_FAILED, error: error })
        }
}

function* onUserLike(action) {
        try {
                yield Local.onLike(action.value);
        } catch (error) {
                console.log(error);
        }
}

export function* watchFetchListFilm() {
        yield takeLatest(FETCH_FILM, fetchListFilmMovie)
}

export function* watchOnUserLike() {
        yield takeLatest(LIKE_FILM, onUserLike)
}


