import { UPDATE_USER_SUCCEEDED, UPDATE_USER_FAILED } from '../actions/action_types';


const EditInfoUser = (state = [], action) => {
        switch (action.type) {
                case UPDATE_USER_SUCCEEDED:
                        return action.message;
                case UPDATE_USER_FAILED:
                        return action.message;
                default:
                        return state;
        }
};

export default EditInfoUser;

