import { connect } from 'react-redux';
import SideBar from "../../components/slideBar";
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    isToggle: state.isToggled.toggled
  };
}

export default connect(mapStateToProps)(SideBar);
