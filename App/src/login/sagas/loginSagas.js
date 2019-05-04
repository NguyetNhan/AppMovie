import { SignIn, SignUp, Forget, SignInSucceeded, SignInFailed } from '../actions/ActionType';

import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';

function* signInMovies(action) {
  try {
    const data = yield Api.signInFromApi(action.user)
 //   console.log('data = ',data);
    yield put({ type: SignInSucceeded, receiverSignIn: data })
  } catch (error) {
    yield put({ type: SignInFailed, error: error })
  }
}

export function* watchSignIn() {
  yield takeLatest(SignIn, signInMovies)
}

function* sayHello() {
  console.log('hello em yeu');
}
export function* watchTest() {
  yield takeLatest(Forget, sayHello);
}