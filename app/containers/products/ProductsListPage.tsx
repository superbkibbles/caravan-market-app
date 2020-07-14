import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ProductsList from "../../components/features/products/ProductsList";
import { getProducts, getPaginationNum } from '../../actions/products';
import { getPageName } from '../../actions/pageName';
import { stateType } from '../../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    products: Object.values(state.products),
    auth: state.auth,
    pageNum: state.paginationNum
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getProducts,
      getPageName,
      getPaginationNum
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
