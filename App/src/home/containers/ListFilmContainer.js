import { connect } from 'react-redux';
import { fetchFilm, likeFilm, xemFilm } from '../actions/index';
import ListFilmComponent from '../components/ListFilmComponent';

var idMovies;

const mapStateToProps = (state) => {
  
    console.log('container = ',state.ListFilmReducer);
    return {
        movies: state.ListFilmReducer,
        isLoading: false,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchFilm: (page) => {
            dispatch(fetchFilm(page))
        },
        onClickLikeFilm: (film) => {
            dispatch(likeFilm(film))
        },
        onClickXemFilm: (film) => {
            dispatch(xemFilm(film))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFilmComponent)














