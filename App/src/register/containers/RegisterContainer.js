import { connect } from 'react-redux';
import { signUpAction } from '../actions/index';
import RegisterComponent from '../components/RegisterComponent';

// các kết quả trả về nằm ở đây
const mapStateToProps = (state) => {

    return {
        user: state.RegisterReducer
    }
};

// nhận các action bên component
const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (user) => {
            dispatch(signUpAction(user));
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);