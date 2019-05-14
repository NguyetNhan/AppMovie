import { connect } from 'react-redux';
import ForgetPasswordComponent from '../components/ForgetPasswordComponent';
import { onForgetPassword } from '../actions/index';

const mapStateToProps = (state) => {
    return {
        message: state.ForgetPasswordReducer
    };
};

// nhận các action bên component
const mapDispatchToProps = (dispatch) => {
    return {
        onClickButtonForgetPassword: (email) => {
            dispatch(onForgetPassword(email));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordComponent);
