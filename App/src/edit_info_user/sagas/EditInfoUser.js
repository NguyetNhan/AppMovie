import { UPDATE_USER, UPDATE_USER_SUCCEEDED, UPDATE_USER_FAILED } from '../actions/action_types';
import { put, takeLatest } from 'redux-saga/effects';

import { Local } from './Local';


function* onUpdateInfoLocal (action) {
        try {
                yield Local.onUpdate(action.user);
                yield put({ type: UPDATE_USER_SUCCEEDED, message: 'update thanh cong' });
        } catch (error) {
                yield put({ type: UPDATE_USER_FAILED, message: 'update that bai' });
        }
}


export function* watchUpdateInfoUserLocal () {
        yield takeLatest(UPDATE_USER, onUpdateInfoLocal);
}

