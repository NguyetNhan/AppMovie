import {FORGET_PASSWORD, FORGET_PASSWORD_SUCCEEDED,FORGET_PASSWORD_FAILED } from './ActionTypes';

export const onForgetPassword = (email)=>{
    return{
        type:FORGET_PASSWORD,
        email
    }
}

export const onForgetPasswordSucceeded =(result)=>{
return {
    type:FORGET_PASSWORD_SUCCEEDED,
    result
}
}

export const onForgetPasswordFailed =(error)=>{
    return {
        type:FORGET_PASSWORD_FAILED,
        error
    }
}

























