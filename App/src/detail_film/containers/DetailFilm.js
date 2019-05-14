import { connect } from 'react-redux';
import { onLikeFilm, onFetchLikeFilm } from '../actions/index';

import DetailFilmComponent from '../components/DetailFilmComponent';

const mapStateToProps = (state) => {

        //  console.log('container = ', state);
        return {
                movie: state.DetailFilm
        };

};

const mapDispatchToProps = (dispatch) => {
        return {
                onClickLikeDetailFilm: (value) => {
                        dispatch(onLikeFilm(value));
                },
                onGetLikeFilm: (value) => {
                        dispatch(onFetchLikeFilm(value));
                }

        };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailFilmComponent);
