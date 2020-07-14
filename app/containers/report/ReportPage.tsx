import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Report from "../../components/features/reports/index";
import { getPageName } from '../../actions/pageName';

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getPageName,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Report);
