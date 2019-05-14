import { FORGET_PASSWORD, FORGET_PASSWORD_SUCCEEDED, FORGET_PASSWORD_FAILED } from '../actions/ActionTypes';

import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';

function* forgetPasswordUser (action) {
    //  console.log('forgetPasswordUser =',action.email);
    try {
        const data = yield Api.forgetPasswordFromApi(action.email);
        yield put({ type: FORGET_PASSWORD_SUCCEEDED, result: data });
        //   console.log('nhan data ',data);
    } catch (error) {
        yield put({ type: FORGET_PASSWORD_FAILED, error: error });
    }
}

export function* watchForgetPassword () {
    yield takeLatest(FORGET_PASSWORD, forgetPasswordUser);
}
