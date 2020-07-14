import {CURRENT_PAGE} from "../actions/types";

const initState = {
  currentPage: ''
};

export default (state = initState, action: any) => {
  if (action.type === CURRENT_PAGE) {
    return {...state, currentPage: action.payload};
  } else {
    return state;
  }
}
