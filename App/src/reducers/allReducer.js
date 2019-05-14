import { combineReducers } from 'redux';
import ListFilmReducer from '../home/reducers/ListFilmReducer';
import LoginReducer from '../login/reducers/LoginReducer';
import RegisterReducer from '../register/reducers/RegisterReducer';
import ForgetPasswordReducer from '../forget_password/reducers/ForgetPasswordReducer';
import DetailFilm from '../detail_film/reducers/DetailFilm';




const allReducer = combineReducers({
    ListFilmReducer,
    LoginReducer,
    RegisterReducer,
    ForgetPasswordReducer,
    DetailFilm
});

export default allReducer;







