import { connect } from 'react-redux';
import { onUpdateUser } from '../actions/index';
import EditInfoUser from '../components/EditInfoUser';

const mapStateToProps = (state) => {
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


