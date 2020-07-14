import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SellingReports from "../../components/features/reports/sellingReports/index";
import { getPageName } from '../../actions/pageName';
import { getSellingReports } from '../../actions/reports'
import { logoutUser } from '../../actions/auth';
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    auth: state.auth,
    reports: state.reports.selling
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getPageName,
      getSellingReports,
      logoutUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SellingReports);
