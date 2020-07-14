import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import BuyingReport from '../../../components/features/reports/buyingReports/report';
import { getBuyingReport } from '../../../actions/reports';
import { stateType } from '../../../reducers/types';

const mapStateToProps = (state: stateType) => {
  return {
    auth: state.auth.authenticateUser,
    report: state.reports.onBuyInvoice
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { getBuyingReport },
    dispatch
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyingReport);
