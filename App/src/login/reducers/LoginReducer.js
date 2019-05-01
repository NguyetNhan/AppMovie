import { SignIn, SignUp, FetchSignIn, Forget, SignInSucceeded, SignInFailed, } from '../actions/ActionType';


// thực hiện các xử lí ở reducer
const LoginReducer = (state = [], action) => {
    switch (action.type) {
        // redux-saga
        case SignInSucceeded:
            return action.receiverSignIn;
        case SignInFailed:
            return action.error;
        default:
            return state;
    }
}
export default LoginReducer;