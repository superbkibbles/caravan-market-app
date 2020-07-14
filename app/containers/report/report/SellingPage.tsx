import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import SellingReport from '../../../components/features/reports/sellingReports/report/index';
import { getSellingReport } from '../../../actions/reports';
import { stateType } from '../../../reducers/types';

const mapStateToProps = (state: stateType) => {
  return {
    auth: state.auth.authenticateUser,
    report: state.reports.onSellInvoice
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { getSellingReport },
    dispatch
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(SellingReport);
