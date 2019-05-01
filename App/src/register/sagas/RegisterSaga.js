import { SIGN_UP, SIGN_UP_SUCCEEDED, SIGN_UP_FAILED } from '../actions/ActionTypes';

import { call, put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';

function* signUpMovies(action){
    try {
        const data = yield Api.signUpFromApi(action.user)
        // console.log('receiver data =',data);
        yield put({type:SIGN_UP_SUCCEEDED,receiverUser:data})
    } catch (error) {
        yield put({type:SIGN_UP_FAILED,error:error})
    }
}

// theo dõi mỗi lần nhấn nút đăng ký thì sẽ gọi hàm signUpMovies để get Api
export function* watchSignUp(){
    yield takeLatest(SIGN_UP,signUpMovies)
}





