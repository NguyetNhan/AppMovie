import { fork, call, all } from 'redux-saga/effects';
import { watchSignIn, watchTest } from '../login/sagas/loginSagas';
import { watchFetchListFilm } from '../home/sagas/ListFilmSaga';
import { watchSignUp } from '../register/sagas/RegisterSaga';

export default function* rootSaga() {
    yield all([
        watchSignIn(),
        watchFetchListFilm(),
        watchTest(),
        watchSignUp()
    ])
}


