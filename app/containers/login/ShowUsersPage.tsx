import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ShowUsers from '../../components/login/secondLogin/ShowUsers';
import { getUsers } from '../../actions/users';
import { logoutStore } from '../../actions/auth';
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    auth: state.auth,
    users: state.users
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getUsers,
      logoutStore
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUsers);
