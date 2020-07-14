import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/header';
import { logoutUser } from '../../actions/auth';
import { closeSlider, openSlider } from '../../actions/toggle';
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    currentPage: state.pageName.currentPage,
    isToggle: state.isToggled.toggled
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      logoutUser,
      closeSlider,
      openSlider
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
