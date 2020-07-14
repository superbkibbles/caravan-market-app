import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ProductsNew from "../../components/features/products/ProductsNew";
import { createProductDetails, getProducts, getAllPharmaciesItems } from '../../actions/products';
import { getBuyInvoice } from '../../actions/invoice';
import { getPageName } from '../../actions/pageName';
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    auth: state.auth,
    buyInvoice: state.invoice.buyInvoice,
    products: Object.values(state.products)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getBuyInvoice,
      getPageName,
      createProductDetails,
      getProducts,
      getAllPharmaciesItems
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsNew);
