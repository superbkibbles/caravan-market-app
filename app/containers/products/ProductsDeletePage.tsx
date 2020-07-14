import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ProductDelete from '../../components/features/products/ProductDelete';
import { getProducts, deleteProduct } from '../../actions/products';
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    products: state.products,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getProducts,
      deleteProduct,
    },
    dispatch
  );
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductDelete);
