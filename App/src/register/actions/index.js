import { SIGN_UP, SIGN_UP_SUCCEEDED, SIGN_UP_FAILED } from './ActionTypes';

export const signUpAction = (user) => {
    return {
        type: SIGN_UP,
        user
    }
}

// action sent by redux-saga
export const signUpSucceededAction = (receiverUser) => {
    return {
        type: SIGN_UP_SUCCEEDED,
        receiverUser
    }
}

export const signUpFailed = (error) => {
    return {
        type: SIGN_UP_FAILED,
        error
    }
}