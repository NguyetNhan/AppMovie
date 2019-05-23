
import { connect } from 'react-redux';
import { fetchFilm, likeFilm, onLogout, fetchInfoUser, onAddCountView } from '../actions/index';
import ListFilmComponent from '../components/ListFilmComponent';


const mapStateToProps = (state) => {
        console.log('container ListFilmComponent = ', state.ListFilmReducer);

        if (state.ListFilmReducer.fetchInfoLocal === undefined && state.ListFilmReducer.fetchFilm === undefined) {
                return {
                        isLoading: false,
                };
        } else if (state.ListFilmReducer.fetchInfoLocal !== undefined) {
                return {
                        userLocal: state.ListFilmReducer.fetchInfoLocal,
                };
        } else {
                return {
                        movies: state.ListFilmReducer.fetchFilm,
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
                onClickXemFilm: (movie) => {
                        dispatch(onAddCountView(movie));
                },
                onClickLogout: (value) => {
                        dispatch(onLogout(value));
                },
                onFetchInfoUserLocal: () => {
                        dispatch(fetchInfoUser());
                },
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFilmComponent);














