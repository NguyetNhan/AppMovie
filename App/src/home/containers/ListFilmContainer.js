
import { connect } from 'react-redux';
import { fetchFilm, likeFilm, xemFilm, onLogout, fetchInfoUser } from '../actions/index';
import ListFilmComponent from '../components/ListFilmComponent';


const mapStateToProps = (state) => {
        console.log('container = ', state.ListFilmReducer);
        if (state.ListFilmReducer.paging === undefined) {
                return {
                        userLocal: state.ListFilmReducer,
                };
        } else {
                return {
                        movies: state.ListFilmReducer,
                        isLoading: false,
                };
        }

};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchFilm: (value) => {
                        dispatch(fetchFilm(value));
                },
                onClickLikeFilm: (value) => {
                        dispatch(likeFilm(value));
                },
                onClickXemFilm: (film) => {
                        dispatch(xemFilm(film));
                },
                onClickLogout: (value) => {
                        dispatch(onLogout(value));
                },
                onFetchInfoUserLocal: (user) => {
                        dispatch(fetchInfoUser(user));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFilmComponent);














