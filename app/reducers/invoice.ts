import {GET_BUY_INVOICE, GET_SELL_INVOICE} from "../actions/types";

const initialState = {
  buyInvoice: 0,
  sellInvoice: 0
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_BUY_INVOICE:
      return {...state, buyInvoice: action.payload};
    case GET_SELL_INVOICE:
      return {...state, sellInvoice: action.payload};
    default:
      return state;
  }
}
