import {GET_PAGINATION} from "../actions/types";

export default (state = 1, action: any) => {
  switch (action.type) {
    case GET_PAGINATION:
      return action.payload;
    default:
      return state
  }
}
