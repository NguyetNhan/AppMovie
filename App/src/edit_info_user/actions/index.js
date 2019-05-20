import { UPDATE_USER, UPDATE_USER_SUCCEEDED, UPDATE_USER_FAILED } from './action_types';

export const onUpdateUser = (user) => {
        return {
                type: UPDATE_USER,
                user
        };
};

export const onUpdateUserSucceeded = (message) => {
        return {
                type: UPDATE_USER_SUCCEEDED,
                message
        };
};


export const onUpdateUserFailed = (message) => {
        return {
                type: UPDATE_USER_FAILED,
                message
        };
};








