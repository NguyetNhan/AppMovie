import { FETCH_LIST_LIKE, FETCH_LIST_LIKE_FAILED, FETCH_LIST_LIKE_SUCCEEDED, LIKE_FILM, XEM_FILM, FETCH_FILM, FETCH_FILM_SUCCEEDED, FETCH_FILM_FAILED } from '../actions/ActionTypes';

import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import { database } from './RealmDatabase';


function* fetchListFilmMovie(action) {
  try {
    var value = yield Api.listFilmFromApi(action.page);
    if (action.user == null) {
      for (i = 0; i < value.data.length; i++) {
        value.data[i].liked = false
        value.data[i].urlImageLike = require('../../../assets/images/ic_like.png')
        value.data[i].textButtonLike = 'Thích'
        value.data[i].colorTextLike = "white"
      }
    } else {
      let data = yield database.fetchListLikeFromLocal(action.user.id)
      data.then(listLike => {
        for (i = 0; i < value.data.length; i++) {
          var check = false
          for (j = 0; j < listLike.length; j++) {
            if (value.data[i].id == listLike[j].movieId) {
              check = true
              value.data[i].liked = listLike[j].status
              if (listLike[j].status) {
                value.data[i].urlImageLike = require('../../../assets/images/ic_like_orange.png')
                value.data[i].textButtonLike = 'Đã thích'
                value.data[i].colorTextLike = "#fd6003"
              } else {
                value.data[i].urlImageLike = require('../../../assets/images/ic_like.png')
                value.data[i].textButtonLike = 'Thích'
                value.data[i].colorTextLike = 'white'
              }

            }
          }
          if (!check) {
            value.data[i].liked = false
            value.data[i].urlImageLike = require('../../../assets/images/ic_like.png')
            value.data[i].textButtonLike = 'Thích'
            value.data[i].colorTextLike = "white"
          }
        }
      })
    }
    console.log('par value: ',value);
    yield put({ type: FETCH_FILM_SUCCEEDED, film: value });
  } catch (error) {
    yield put({ type: FETCH_FILM_FAILED, error: error })
  }
}

function* onLikeMovie(action) {
  try {
    yield database.likeMovie(action.movieLike)
  } catch (error) {
    console.error(error);
  }
}

function* fetchListLikeForUser(action) {
  try {
    //  console.log('action.userId: ',action.userId);

    const data = yield database.fetchListLikeFromLocal(action.userId)
    /* data.then(log=>{
      for(let u of log){
        console.log(`id: ${u.id} movieid: ${u.movieId} status: ${u.status}`);
      }
    }) */
   

    //  yield put({type:FETCH_LIST_LIKE_SUCCEEDED,listLike:data})
  } catch (error) {
    yield put({ type: FETCH_LIST_LIKE_FAILED, error: error })
  }
}

export function* watchFetchListFilm() {
  yield takeLatest(FETCH_FILM, fetchListFilmMovie)
}

export function* watchLikeMovie() {
  yield takeLatest(LIKE_FILM, onLikeMovie)
}

export function* watchFetchListLike() {
  yield takeLatest(FETCH_LIST_LIKE, fetchListLikeForUser)
}
