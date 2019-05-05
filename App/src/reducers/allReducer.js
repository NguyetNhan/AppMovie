import { combineReducers } from 'redux';
import ListFilmReducer from '../home/reducers/ListFilmReducer';
import LoginReducer from '../login/reducers/LoginReducer';
import RegisterReducer from '../register/reducers/RegisterReducer';
import ForgetPasswordReducer from '../forget_password/reducers/ForgetPasswordReducer';




const allReducer = combineReducers({
    ListFilmReducer,
    LoginReducer,
    RegisterReducer,
    ForgetPasswordReducer,
});

export default allReducer;







