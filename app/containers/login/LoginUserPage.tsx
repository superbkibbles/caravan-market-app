import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import LoginUser from '../../components/login/secondLogin/LoginUser';
import { getUsers } from '../../actions/users';
import { secondLogin } from "../../actions/auth";
import { stateType } from '../../reducers/types';


const mapStateToProps = (state: stateType) => {
  return{
    authError: state.auth.errorMessage,
    authStore: state.auth.authenticateStore,
    users: state.users
  }
};

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getUsers,
      secondLogin
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
