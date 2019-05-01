import { SIGN_UP, SIGN_UP_SUCCEEDED, SIGN_UP_FAILED } from '../actions/ActionTypes';

// lắng nghe các sự kiện trả về từ saga

const RegisterReducer = (state=[],action)=>{
    switch(action.type){
        case SIGN_UP_SUCCEEDED:
        return action.receiverUser
        case SIGN_UP_FAILED:
        return action.error
        default:
        return state
    }
}

export default RegisterReducer
















