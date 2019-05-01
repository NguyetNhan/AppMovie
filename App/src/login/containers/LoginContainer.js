import { connect } from 'react-redux';
import LoginComponent from '../components/LoginComponent';
import { signInAction, signUpAction, forgetAction, signInSucceeded, signInFailed } from '../actions/index';

// các kết quả trả về nằm ở đây
const mapStateToProps = (state) => {

    return {
        user: state.LoginReducer
    }
};

// nhận các action bên component
const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (user) => {
            dispatch(signInAction(user));
        },
        onSignUp: () => {
            dispatch(signUpAction());
        },
        onForget: () => {
            dispatch(forgetAction());
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);