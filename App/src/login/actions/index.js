import { SignIn, SignUp, Forget, SignInSucceeded, SignInFailed } from './ActionType';


// các xự kiện của component
export const signInAction = (user) => {
    return {
        type: SignIn,
        user
    }
}

export const signUpAction = () => {
    return {
        type: SignUp,
    }
}

export const forgetAction = () => {
    return {
        type: Forget,
    }
}


// action sent by redux-saga
export const signInSucceededAction = (receiverSignIn) => {
    return {
        type: SignInSucceeded,
        receiverSignIn
    }
}

export const signInFailedAction = (error) => {
    return {
        type: SignInFailed,
        error
    }
}

