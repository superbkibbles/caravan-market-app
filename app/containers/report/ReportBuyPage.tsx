import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import BuyingReports from "../../components/features/reports/buyingReports/index";
import { getPageName } from '../../actions/pageName';
import { getBuyingReports } from '../../actions/reports'
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    auth: state.auth,
    reports: state.reports.buying
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getPageName,
      getBuyingReports
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyingReports);
