import {GET_PURCHASED_REPORTS, GET_SOLD_REPORTS, GET_ONE_BUY_INVOICE, GET_ONE_SELL_INVOICE} from "../actions/types";
import _ from "lodash";

const initState = {
  buying: [],
  selling: [],
  onBuyInvoice: [],
  onSellInvoice: []
};

export default (state: any = initState, action: any) => {
  switch (action.type) {
    case GET_PURCHASED_REPORTS:
      return { ...state, buying: action.payload};
    case GET_SOLD_REPORTS:
      return { ...state, selling: action.payload};
    case GET_ONE_BUY_INVOICE:
      return { ...state, onBuyInvoice: action.payload};
    case GET_ONE_SELL_INVOICE:
      return { ...state, onSellInvoice: action.payload};
    default:
      return state
  }
}
