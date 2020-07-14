import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import sellerV2 from '../../../components/features/seller/v2';
import { getProducts, sellProducts } from '../../../actions/products';
import { logoutUser } from '../../../actions/auth';
import { getSellInvoice } from '../../../actions/invoice'
import { stateType } from '../../../reducers/types';
import requireAuth from "../../../HOC/authentication/requireAuth";

function mapStateToProps(state: stateType) {
  return {
    products: Object.values(state.products),
    auth: state.auth,
    sellInvoice: state.invoice.sellInvoice
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getProducts,
      logoutUser,
      getSellInvoice,
      sellProducts
    },
    dispatch
  );
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(sellerV2), "authenticateUser", "/login/users");
