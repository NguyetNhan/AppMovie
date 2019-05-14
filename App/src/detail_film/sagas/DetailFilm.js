import { LIKE_FILM_DETAIL, FETCH_LIKE_FILM, FETCH_LIKE_FILM_SUCCEEDED, FETCH_LIKE_FILM_FAILED } from '../actions/Actions';
import { put, takeLatest } from 'redux-saga/effects';

// gọi methor từ sagas của packect home
import { Local } from '../../home/sagas/StorageLocal';

function* onClickLike (action) {
        try {
                yield Local.onLike(action.value);
        } catch (error) {
                console.log(error);
        }
}

function* onGetLikeDetailFilm (action) {
        try {
                const listLike = yield Local.onListLikeMoveOfUser(action.value.user.id);
                var movie = action.value.movie;
                if (listLike == null) {
                        movie.liked = false;
                        movie.urlImageLike = require('../../../assets/images/ic_like.png');
                        movie.textButtonLike = 'Thích';
                        movie.colorTextLike = 'white';
                } else {
                        for (i = 0; i < listLike.like.length; i++) {
                                if (listLike.like[i].movie === movie.id) {
                                        movie.liked = listLike.like[i].status;
                                        movie.urlImageLike = require('../../../assets/images/ic_like_orange.png');
                                        movie.textButtonLike = 'Đã thích';
                                        movie.colorTextLike = '#fd6003';
                                }
                        }
                }
                yield put({ type: FETCH_LIKE_FILM_SUCCEEDED, movie: movie });
        } catch (error) {
                yield put({ type: FETCH_LIKE_FILM_FAILED, error: error });

        }
}


export function* watchOnClickLikeFromDetailFilm () {
        yield takeLatest(LIKE_FILM_DETAIL, onClickLike);
}

export function* watchOnGetLikeFromDetailFilm () {
        yield takeLatest(FETCH_LIKE_FILM, onGetLikeDetailFilm);
}