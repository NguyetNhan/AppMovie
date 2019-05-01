import { LIKE_FILM, XEM_FILM, FETCH_FILM, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED } from '../actions/ActionTypes';

import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';



function* fetchListFilmMovie(action) {
  try {
    const data = yield Api.listFilmFromApi(action.page);
    yield put({ type: FETCH_FILM_SUCCEEDED, film: data });
  } catch (error) {
    yield put({ type: FETCH_FILM_FAILED, error: error })
  }

}

export function* watchFetchListFilm() {
  yield takeLatest(FETCH_FILM, fetchListFilmMovie)
}
