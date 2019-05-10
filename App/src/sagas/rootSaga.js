import { all } from 'redux-saga/effects';
import { watchSignIn, watchTest } from '../login/sagas/loginSagas';
import { watchFetchListFilm, watchOnUserLike} from '../home/sagas/ListFilmSaga';
import { watchSignUp } from '../register/sagas/RegisterSaga';
import {  watchForgetPassword} from '../forget_password/sagas/ForgetPasswordSaga';

export default function* rootSaga() {
    yield all([
        watchSignIn(),
        watchFetchListFilm(),
        watchTest(),
        watchSignUp(),
        watchForgetPassword(),
        watchOnUserLike()
    ])
}


