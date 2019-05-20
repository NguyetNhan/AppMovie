import { all, fork } from 'redux-saga/effects';
import { watchSignIn, watchTest } from '../login/sagas/loginSagas';
import { watchFetchListFilm, watchOnUserLike, watchLogout, watchFetchInfoUser } from '../home/sagas/ListFilmSaga';
import { watchSignUp } from '../register/sagas/RegisterSaga';
import { watchForgetPassword } from '../forget_password/sagas/ForgetPasswordSaga';
import { watchOnClickLikeFromDetailFilm, watchOnGetLikeFromDetailFilm } from '../detail_film/sagas/DetailFilm';
import { watchUpdateInfoUserLocal } from '../edit_info_user/sagas/EditInfoUser';

export default function* rootSaga () {
    yield all([
        watchSignIn(),
        watchFetchListFilm(),
        watchTest(),
        watchSignUp(),
        watchForgetPassword(),
        watchOnUserLike(),
        watchOnClickLikeFromDetailFilm(),
        watchOnGetLikeFromDetailFilm(),
        watchLogout(),
        watchFetchInfoUser(),
        watchUpdateInfoUserLocal(),
    ]);

    /*   yield all([
          fork(watchSignIn),
          fork(watchFetchListFilm),
          fork(watchTest),
          fork(watchSignUp),
          fork(watchForgetPassword),
          fork(watchOnUserLike),
          fork(watchOnClickLikeFromDetailFilm),
          fork(watchOnGetLikeFromDetailFilm),
          fork(watchLogout),
          fork(watchFetchInfoUser),
      ]); */



}


