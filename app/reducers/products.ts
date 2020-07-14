import _ from "lodash";

import {GET_PRODUCTS, GET_ALL_PRODUCTS, DELETE_PRODUCT, GET_PRODUCT, CREATE_PRODUCTS, EDIT_PRODUCT} from "../actions/types";

export default(state = {}, action: any) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ..._.mapKeys(action.payload, "item_id") };
    case GET_ALL_PRODUCTS:
      return { ...state, ..._.mapKeys(action.payload, "item_id") };
    case DELETE_PRODUCT:
      return _.omit(state, action.payload);
    case GET_PRODUCT:
      return {...state, [action.payload.item_id]: action.payload};
    case CREATE_PRODUCTS:
      return { ...state, [action.payload.item_id]: action.payload };
    case EDIT_PRODUCT:
      return  { ...state, [action.payload.item]: action.payload };
    default:
      return state;
  }
}
