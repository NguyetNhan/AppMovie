import { connect } from 'react-redux';
import { fetchListLike,fetchFilm, likeFilm, xemFilm } from '../actions/index';
import ListFilmComponent from '../components/ListFilmComponent';


const mapStateToProps = (state) => {
  
 //   console.log('container = ',state.ListFilmReducer);
    return {
        movies: state.ListFilmReducer,
        isLoading: false,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchFilm: (page,user) => {
            dispatch(fetchFilm(page,user))
        },
        onClickLikeFilm: ({userId,movieId}) => {
            dispatch(likeFilm({userId,movieId}))
        },
        onClickXemFilm: (film) => {
            dispatch(xemFilm(film))
        },
        onFetchListLike:(userId)=>{
            dispatch(fetchListLike(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFilmComponent)














