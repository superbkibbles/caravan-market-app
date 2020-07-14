import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import FirstLogin from '../../components/login/firstLogin';
import { firstLogin } from '../../actions/auth';
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      firstLogin
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstLogin);
