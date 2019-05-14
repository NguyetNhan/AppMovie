import { FORGET_PASSWORD_SUCCEEDED, FORGET_PASSWORD_FAILED } from '../actions/ActionTypes';



const ForgetPasswordReducer = (state = [], action) => {
    switch (action.type) {
        case FORGET_PASSWORD_SUCCEEDED:
            return action.result;
        case FORGET_PASSWORD_FAILED:
            return action.error;
        default:
            return state;
    }
};

export default ForgetPasswordReducer;











