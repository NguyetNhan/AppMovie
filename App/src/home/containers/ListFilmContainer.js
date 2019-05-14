
import { connect } from 'react-redux';
import { fetchFilm, likeFilm, xemFilm } from '../actions/index';
import ListFilmComponent from '../components/ListFilmComponent';


const mapStateToProps = (state) => {

        //   console.log('container = ',state.ListFilmReducer);
        return {
                movies: state.ListFilmReducer,
                isLoading: false,
        };
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
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFilmComponent);














