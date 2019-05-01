import { combineReducers } from 'redux';
import ListFilmReducer from '../home/reducers/ListFilmReducer';
import LoginReducer from '../login/reducers/LoginReducer';
import RegisterReducer from '../register/reducers/RegisterReducer';




const allReducer = combineReducers({
    ListFilmReducer,
    LoginReducer,
    RegisterReducer
});

export default allReducer;







