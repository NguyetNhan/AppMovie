import { connect } from 'react-redux';
import { onUpdateUser } from '../actions/index';
import EditInfoUser from '../components/EditInfoUser';

const mapStateToProps = (state) => {
        /*      console.log('state.EditInfoUser: ', state.EditInfoUser);
             if (state.EditInfoUser.length !== 0 && state.EditInfoUser !== null) {
                     alert(state.EditInfoUser);
             } */
        return {
                message: state.EditInfoUser,
                loading: false
        };

};

const mapDispatchToProps = (dispatch) => {
        return {
                onClickUpdateUser: (user) => {
                        dispatch(onUpdateUser(user));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInfoUser);


